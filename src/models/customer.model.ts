import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Users} from './users.model';

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
  created?: string;

  @property({
    type: 'date',
    default: () => new Date()
  })
  modified?: string;

  @hasMany(() => Users)
  users: Users[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
