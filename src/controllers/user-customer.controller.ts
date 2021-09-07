import {authenticate} from '@loopback/authentication';
import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  User,
  Customer,
} from '../models';
import {UserRepository} from '../repositories';

export class UserCustomerController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }
  @authenticate('jwt')
  @get('/users/{id}/customer', {
    responses: {
      '200': {
        description: 'Customer belonging to User',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Customer)},
          },
        },
      },
    },
  })
  async getCustomer(
    @param.path.number('id') id: typeof User.prototype.id,
  ): Promise<Customer> {
    return this.userRepository.customer(id);
  }
}
