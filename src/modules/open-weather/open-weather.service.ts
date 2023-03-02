import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { APP_ERRORS } from 'src/common/errors';
import { catchError, firstValueFrom } from 'rxjs';
import { WeatherCurrentApiDTO } from './dto/weather-current-api.dto';
import { WeatherForecastDTO } from './dto/weather-forecast.dto';

@Injectable()
export class OpenWeatherService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async fetchCurrent(name: string): Promise<WeatherCurrentApiDTO> {
    const urlApi = this.configService.get('weather_url_api');
    const token = this.configService.get('weather_token');
    const { data } = await firstValueFrom(
      this.httpService
        .get<WeatherCurrentApiDTO>(
          `${urlApi}/weather?q=${name}&units=metric&appid=${token}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            //! throw error;
            throw new BadRequestException(APP_ERRORS.CITY_NOT_FOUND);
          }),
        ),
    );

    return data;
  }

  async fetchForecast(name: string): Promise<WeatherForecastDTO> {
    const urlApi = this.configService.get('weather_url_api');
    const token = this.configService.get('weather_token');
    const { data } = await firstValueFrom(
      this.httpService
        .get<WeatherForecastDTO>(
          `${urlApi}/forecast?q=${name}&units=metric&appid=${token}`,
        )
        .pipe(
          catchError((error: AxiosError) => {
            //! throw error;
            throw new BadRequestException(APP_ERRORS.CITY_NOT_FOUND);
          }),
        ),
    );

    return data;
  }
}
