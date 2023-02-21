import { Model, Table, Column } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  email: string;

  @Column
  name: string;

  @Column
  password: string;

  @Column
  urlAvatar: string;
}
