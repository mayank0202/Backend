import {Entity, model, property, hasMany} from '@loopback/repository';
import {User} from './user.model';

@model()
export class Customer extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  website: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  created  : string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  modified  : string;

  @hasMany(() => User)
  user: User[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
