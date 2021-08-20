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
  Users,
} from '../models';
import {CustomerRepository} from '../repositories';

export class CustomerUsersController {
  constructor(
    @repository(CustomerRepository) protected customerRepository: CustomerRepository,
  ) { }

  @get('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Array of Customer has many Users',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Users)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Users>,
  ): Promise<Users[]> {
    return this.customerRepository.users(id).find(filter);
  }

  @post('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Users)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Customer.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {
            title: 'NewUsersInCustomer',
            exclude: ['id'],
            optional: ['customerId']
          }),
        },
      },
    }) users: Omit<Users, 'id'>,
  ): Promise<Users> {
    return this.customerRepository.users(id).create(users);
  }

  @patch('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer.Users PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Users, {partial: true}),
        },
      },
    })
    users: Partial<Users>,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.customerRepository.users(id).patch(users, where);
  }

  @del('/customers/{id}/users', {
    responses: {
      '200': {
        description: 'Customer.Users DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Users)) where?: Where<Users>,
  ): Promise<Count> {
    return this.customerRepository.users(id).delete(where);
  }
}
