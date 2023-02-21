import { Model, Table, Column } from 'sequelize-typescript';

@Table
export class Todo extends Model {
  @Column
  uid: number;

  @Column
  title: string;

  @Column
  category: string;

  @Column
  priority: number;

  @Column
  deadline: Date;

  @Column
  status: boolean;

  @Column
  background: string;
}
