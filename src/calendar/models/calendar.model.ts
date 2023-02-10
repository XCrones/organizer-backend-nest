import { Model, Table, Column } from 'sequelize-typescript';

@Table
export class Calendar extends Model {
  @Column
  uid: number;

  @Column
  eventStart: Date;

  @Column
  eventEnd: Date;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  color: string;

  @Column
  background: string;
}
