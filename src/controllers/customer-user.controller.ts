import {authenticate} from '@loopback/authentication';
import { authorize } from '@loopback/authorization';
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Customer,
  User,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerUserController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }
  @authenticate('jwt')
  @get('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Customer has many User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(User)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<User>,
  ): Promise<User[]> {
    return this.customerRepository.user(id).find(filter);
  }
  @authenticate('jwt')
  @authorize({allowedRoles:['superadmin']})
  @post('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(User)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {
            title: 'NewUserInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) user: Omit<User, 'id'>,
  ): Promise<User> {
    return this.customerRepository.user(id).create(user);
  }
  @authenticate('jwt')
  @authorize({allowedRoles:['superadmin','admin']})
  @patch('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer.User PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(User, {partial: true}),
        },
      },
    })
    user: Partial<User>,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.customerRepository.user(id).patch(user, where);
  }
  @authenticate('jwt')
  @authorize({allowedRoles:['superadmin','admin']})
  @del('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer.User DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(User)) where?: Where<User>,
  ): Promise<Count> {
    return this.customerRepository.user(id).delete(where);
  }
}
