import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Users,
  Customer,
} from '../models';
import {UsersRepository} from '../repositories';

export class UsersCustomerController {
  constructor(
    @repository(UsersRepository)
    public usersRepository: UsersRepository,
  ) { }

  @get('/users/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to Users',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof Users.prototype.id,
  ): Promise<Customer> {
    return this.usersRepository.customer(id);
  }
}
