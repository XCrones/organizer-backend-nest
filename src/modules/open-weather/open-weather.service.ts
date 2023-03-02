import { HttpService } from '@nestjs/axios';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosError } from 'axios';
import { APP_ERRORS } from 'src/common/errors';
import { catchError, firstValueFrom } from 'rxjs';
import { WeatherApiDTO } from './dto/weather-api.dto';

@Injectable()
export class OpenWeatherService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async fetchCity(name: string): Promise<WeatherApiDTO> {
    const urlApi = this.configService.get('weather_url_api');
    const token = this.configService.get('weather_token');
    const { data } = await firstValueFrom(
      this.httpService
        .get<WeatherApiDTO>(`${urlApi}?q=${name}&units=metric&appid=${token}`)
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
