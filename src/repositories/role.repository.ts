import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository,} from '@loopback/repository';
import {PostgresDataSource} from '../datasources';
import {Role, RoleRelations} from '../models';
import {UsersRepository} from './users.repository';

export class RoleRepository extends DefaultCrudRepository<
  Role,
  typeof Role.prototype.key,
  RoleRelations
> {

  // public readonly users: HasManyRepositoryFactory<Users, typeof Role.prototype.key>;

  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource, @repository.getter('UsersRepository') protected usersRepositoryGetter: Getter<UsersRepository>,
  ) {
    super(Role, dataSource);
    // this.users = this.createHasManyRepositoryFactoryFor('users', usersRepositoryGetter,);
    // this.registerInclusionResolver('users', this.users.inclusionResolver);
  }
}
