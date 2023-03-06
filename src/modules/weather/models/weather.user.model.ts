import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class WeatherUser extends Model {
  @Column
  uid: number;

  @Column(DataType.JSONB)
  citiesId: number[];
}
