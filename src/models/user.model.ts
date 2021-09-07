import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Customer} from './customer.model';
import {Role} from './role.model';

@model()
export class User extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  firstname: string;

  @property({
    type: 'string',
  })
  middlename: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,

  })
  password: string;

  @property({
    type: 'string',
    required: true,
  })
  phonenumber: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @belongsTo(() => Role)
  roleId: number;

  @belongsTo(() => Customer)
  customerId: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  created?: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  modified?: string;


  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
