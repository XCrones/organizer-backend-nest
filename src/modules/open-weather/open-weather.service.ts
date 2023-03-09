import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { APP_ERRORS } from 'src/common/errors';
import { catchError, firstValueFrom } from 'rxjs';
import { WeatherByGeoDTO } from './dto/weather-geo.dto';

export type TParamReq = 'weather' | 'forecast';

@Injectable()
export class OpenWeatherService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async fetchWeatherByName(name: string, reqParam: TParamReq): Promise<any> {
    if (!!name) {
      const urlApi = this.configService.get('weather_url_api');
      const token = this.configService.get('weather_token');

      const { data } = await firstValueFrom(
        this.httpService
          .get<any>(
            `${urlApi}/${reqParam}?q=${name}&units=metric&appid=${token}`,
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
    throw new BadRequestException(APP_ERRORS.CITY_EMPTY_NAME);
  }

  async fetchWeatherByGeo(
    dto: WeatherByGeoDTO,
    reqParam: TParamReq,
  ): Promise<any> {
    if (dto.lat && dto.lon) {
      const urlApi = this.configService.get('weather_url_api');
      const token = this.configService.get('weather_token');

      const { data } = await firstValueFrom(
        this.httpService
          .get<any>(
            `${urlApi}/${reqParam}?lat=${dto.lat}&lon=${dto.lon}&units=metric&appid=${token}`,
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

    throw new BadRequestException(APP_ERRORS.CITY_EMPTY_NAME);
  }
}
