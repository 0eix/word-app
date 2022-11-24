import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
  Cascade,
} from '@mikro-orm/core';

import { BaseEntity } from './BaseEntity';

import { IsAlpha, IsEmail } from 'class-validator';

import { Word } from './Word';

@Entity()
export class User extends BaseEntity {
  @Property({ nullable: false })
  @Unique()
  @IsAlpha()
  login: string;

  @Property({ nullable: false })
  password: string;

  @Property({ nullable: false })
  @Unique()
  @IsEmail()
  email: string;

  @OneToMany(() => Word, (word) => word.user, { cascade: [Cascade.ALL] })
  words = new Collection<Word>(this);

  constructor() {
    super();
  }
}
