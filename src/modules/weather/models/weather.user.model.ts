import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { ICityWeather } from '../interfaces/city-weather.interface';

@Table
export class WeatherUser extends Model {
  @Column
  uid: number;

  @Column(DataType.JSONB)
  weatherCities: ICityWeather[];
}
