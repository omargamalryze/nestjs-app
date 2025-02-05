import {
  AllowNull,
  AutoIncrement,
  Column,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

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

  //Hook that runs before a user is created or updated
  // @BeforeUpdate
  // @BeforeCreate
  // static hashPassword(instance: Users) {
  //   instance.password = 'hashed';
  // }
}
