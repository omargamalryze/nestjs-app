import { Model } from 'sequelize-typescript';
import { BelongsTo, Column, ForeignKey, Table } from 'sequelize-typescript';
import { Users } from 'src/users/users.model';

@Table
export class Todos extends Model {
  @Column
  name: string;
  @Column
  description: string;
  @Column
  check: boolean;

  @ForeignKey(() => Users)
  @Column
  userId: number;

  @BelongsTo(() => Users)
  users: Users;
}
