import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';

import { IsAlpha } from 'class-validator';

import { User } from './User';

@Entity()
export class Word extends BaseEntity {
  @Property({ nullable: false })
  @Unique()
  @IsAlpha()
  word: string;

  @ManyToOne(() => User)
  user: User;

  constructor() {
    super();
  }
}
