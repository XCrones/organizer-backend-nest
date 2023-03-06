import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class WeatherUser extends Model {
  @Column
  uid: number;

  @Column
  cityID: number;
}
