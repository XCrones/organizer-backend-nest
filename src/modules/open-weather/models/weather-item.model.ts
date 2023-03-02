export interface IWeatherItem {
  dt: number;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
    sea_level: number;
    feels_like: number;
    grnd_level: number;
    temp_kf: number;
  };
  weather: [
    {
      id: number;
      main: string;
      description: string;
      icon: string;
    },
  ];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    '1h': number;
    '3h': number;
  };
  snow: {
    '1h': number;
    '3h': number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
}
