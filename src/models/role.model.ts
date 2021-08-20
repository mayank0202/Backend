import {Entity, model, property} from '@loopback/repository';


@model()
export class Role extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  key: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;



  constructor(data?: Partial<Role>) {
    super(data);
  }
}

export interface RoleRelations {
  // describe navigational properties here
}

export type RoleWithRelations = Role & RoleRelations;
