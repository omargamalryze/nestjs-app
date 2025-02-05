import {
  AllowNull,
  AutoIncrement,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Todos } from 'src/todos/todos.model';

@Table
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @AllowNull(false)
  @Column
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  //OneToMany Relationship
  @HasMany(() => Todos)
  todos: Todos[];

  //Hook that runs before a user is created or updated
  // @BeforeUpdate
  // @BeforeCreate
  // static hashPassword(instance: Users) {
  //   instance.password = 'hashed';
  // }
}
