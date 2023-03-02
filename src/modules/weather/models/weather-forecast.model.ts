import { Column, Model, Table, DataType } from 'sequelize-typescript';
import { IWeatherItem } from 'src/modules/open-weather/models/weather-item.model';

@Table
export class WeatherForecast extends Model {
  @Column
  cod: string;

  @Column
  message: number;

  @Column
  cnt: number;

  @Column(DataType.JSONB)
  list: Array<IWeatherItem>;

  @Column(DataType.JSONB)
  city: {
    id: number;
    name: string;
    coord: {
      lat: number;
      lon: number;
    };
    country: string;
    population: number;
    timezone: number;
    sunrise: number;
    sunset: number;
  };
}
