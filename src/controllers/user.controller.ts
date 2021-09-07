/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  model,
  property,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {inject} from '@loopback/core'
import {User} from '../models';
import {UserRepository} from '../repositories';
import { TokenServiceBindings, UserServiceBindings } from '../keys';
import { SecurityBindings,securityId,UserProfile} from '@loopback/security'
import { JWTService } from '../services/jwt-service';
import { MyuserService } from '../services/user-service';
import { Credentials } from '@loopback/authentication-jwt';
import { authenticate } from '@loopback/authentication';
import { genSalt, hash } from 'bcryptjs';
import {SchemaObject} from '@loopback/rest';
import { authorize } from '@loopback/authorization';

@model()
export class NewUserRequest extends User {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

const CredentialsSchema: SchemaObject = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      format: 'email',
    },
    password: {
      type: 'string',
      minLength: 3,
    },
  },
};

export const CredentialsRequestBody = {
  description: 'The input of login function',
  required: true,
  content: {
    'application/json': {schema: CredentialsSchema},
  },
};

export class UsersController {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyuserService,
    @inject(SecurityBindings.USER, {optional: true})
    public user: UserProfile,
    @repository(UserRepository) protected usersRepository: UserRepository,
  ) {}

  @post('/users/login', {
    responses: {
      '200': {
        description: 'Token',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                },
              },
            },
          },
        },
      },
    },
  })
  async login(
    @requestBody(CredentialsRequestBody) credentials: Credentials,
  ): Promise<{token: string}> {
    // ensure the user exists, and the password is correct
    const user = await this.userService.verifyCredentials(credentials);
    // convert a User object into a UserProfile object (reduced set of properties)
    const userProfile = this.userService.convertToUserProfile(user);
    console.log("userProfile");
    // create a JSON Web Token based on the user profile
    const token = await this.jwtService.generateToken(userProfile);
    return {token};
  }


  @get('/whoAmI', {
    responses: {
      '200': {
        description: 'Return current user',
        content: {
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
    },
  })
  async whoAmI(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
  ): Promise<string> {
    return currentUserProfile[securityId];
  }

  @post('/signup', {
    responses: {
      '200': {
        description: 'User',
        content: {
          'application/json': {
            schema: {
              'x-ts-type': User,
            },
          },
        },
      },
    },
  })
  async signUp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            title: 'NewUser',
          }),
        },
      },
    })
    newUserRequest: User,
  ): Promise<User> {
    const password = await hash(newUserRequest.password, await genSalt());
    newUserRequest.password = password;

    const savedUser = await this.usersRepository.create(newUserRequest);


    return savedUser;
  }
// export class UsersController {
//   constructor(
//     @repository(UsersRepository)
//     public usersRepository : UsersRepository,
//   ) {}
@authenticate('jwt')
@authorize({allowedRoles:['superadmin']})
  @post('/users')
  @response(200, {
    description: 'Users model instance',
    content: {'application/json': {schema: getModelSchemaRef(User)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUsers',

          }),
        },
      },
    })
    users: User,
  ): Promise<User> {
    return this.usersRepository.create(users);
  }

  @get('/users/count')
  @response(200, {
    description: 'Users model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.usersRepository.count(where);
  }
  @authenticate('jwt')
  @authorize({allowedRoles:['superadmin','admin','subscriber']})
  @get('/users')
  @response(200, {
    description: 'Array of Users model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(User, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(User) filter?: Filter<User>,
  ): Promise<User[]> {
    return this.usersRepository.find(filter);
  }
  @authenticate('jwt')
  @authorize({allowedRoles:['superadmin','admin']})
  @patch('/users')
  @response(200, {
    description: 'Users PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    users: User,
    @param.where(User) where?: Where<User>,
  ): Promise<Count> {
    return this.usersRepository.updateAll(users, where);
  }
  @authenticate('jwt')
  @get('/users/{id}')
  @response(200, {
    description: 'Users model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(User, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(User, {exclude: 'where'}) filter?: FilterExcludingWhere<User>
  ): Promise<User> {
    return this.usersRepository.findById(id, filter);
  }

  @patch('/signup/{id}')
  @response(204, {
    description: 'Users PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    users: User,
  ): Promise<void> {
    const password = await hash(users.password, await genSalt());
    users.password = password;

    const savedUser = await this.usersRepository.updateById(id,users);




  }
  @authenticate('jwt')
  @authorize({allowedRoles:['superadmin','admin']})
  @put('/users/{id}')
  @response(204, {
    description: 'Users PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() users: User,
  ): Promise<void> {
    await this.usersRepository.replaceById(id, users);
  }
  @authenticate('jwt')
  @authorize({allowedRoles:['superadmin']})
  @del('/users/{id}')
  @response(204, {
    description: 'Users DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.usersRepository.deleteById(id);
  }
}
