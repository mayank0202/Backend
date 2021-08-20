import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Role} from './role.model';
import {Customer} from './customer.model';
import { SmallIntegerDataType } from 'sequelize/types';

@model()
export class Users extends Entity {
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
  middlename?: string;

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
    type: 'any',
    required: true,
  })
  phonenumber: SmallIntegerDataType;

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
    default: () => new Date()
  })
  created ? : string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  modified ? : string;



  constructor(data?: Partial<Users>) {
    super(data);
  }
}

export interface UsersRelations {
  // describe navigational properties here
}

export type UsersWithRelations = Users & UsersRelations;
