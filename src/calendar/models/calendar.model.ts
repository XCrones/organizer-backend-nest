import { Model, Table, Column } from 'sequelize-typescript';

@Table
export class CalendarModel extends Model {
  @Column
  uid: number;

  @Column
  year: number;

  @Column
  month: number;

  @Column
  day: number;

  @Column
  timeStart: string;

  @Column
  timeEnd: string;

  @Column
  title: string;

  @Column
  description: string;

  @Column
  color: string;

  @Column
  background: string;
}
