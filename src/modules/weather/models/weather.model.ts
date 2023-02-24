import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Weather extends Model {
  @Column(DataType.JSONB)
  coord: {
    lon: number;
    lat: number;
  };

  @Column(DataType.JSONB)
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];

  @Column
  base: string;

  @Column(DataType.JSONB)
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };

  @Column
  visibility: number;

  @Column(DataType.JSONB)
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };

  @Column(DataType.JSONB)
  rain: {
    '1h': number;
    '3h': number;
  };

  @Column(DataType.JSONB)
  snow: {
    '1h': number;
    '3h': number;
  };

  @Column(DataType.JSONB)
  clouds: {
    all: number;
  };

  @Column
  dt: number;

  @Column(DataType.JSONB)
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
    message: string;
  };

  @Column
  timezone: number;

  @Column
  cityID: number;

  @Column
  name: string;

  @Column
  cod: number;
}
