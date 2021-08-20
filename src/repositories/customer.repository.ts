import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Customer, CustomerRelations, Users} from '../models';
import {UsersRepository} from './users.repository';

export class CustomerRepository extends DefaultCrudRepository<
  Customer,
  typeof Customer.prototype.id,
  CustomerRelations
> {

  public readonly users: HasManyRepositoryFactory<Users, typeof Customer.prototype.id>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Customer, dataSource);
    this.users = this.createHasManyRepositoryFactoryFor('users', usersRepositoryGetter,);
    this.registerInclusionResolver('users', this.users.inclusionResolver);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (this.modelClass as any).observe('persist', async (ctx: any) => {
      ctx.data.modified = new Date();
    });
  }
}
