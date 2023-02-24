import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Weather } from './models/weather.model';
import { GetCityDTO } from './dto/get-city.dto';
import { WeatherResponse } from './response/response';
import { APP_ERRORS } from 'src/common/errors';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { WeatherApiDTO } from './dto/weather.api.dto';
import { WeatherBaseDTO } from './dto/weather.base.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather) private weatherRepository: typeof Weather,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  convertToCityID(dto: WeatherApiDTO): WeatherBaseDTO {
    const { id: cityID, ...metaDate } = dto;
    return { cityID, ...metaDate } as WeatherBaseDTO;
  }

  async searchCityByName(name: string): Promise<WeatherResponse | null> {
    return (await this.weatherRepository.findOne({
      where: { name },
    })) as WeatherResponse;
  }

  async searchCity(dto: WeatherBaseDTO): Promise<WeatherResponse | null> {
    return (await this.weatherRepository.findOne({
      where: { name: dto.name, cityID: dto.cityID },
    })) as WeatherResponse;
  }

  checkNulls(dto: WeatherBaseDTO): WeatherBaseDTO {
    if (!dto.rain) {
      dto.rain = null;
    }

    if (!dto.snow) {
      dto.snow = null;
    }

    if (!dto.clouds) {
      dto.snow = null;
    }

    return dto;
  }

  async updateCity(dto: WeatherBaseDTO, id: number): Promise<WeatherResponse> {
    dto = this.checkNulls(dto);

    const result = await this.weatherRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    const [count, item] = result;
    const payload = item[0] as WeatherResponse;

    if (payload) {
      return payload;
    }
    throw new BadRequestException(APP_ERRORS.CITY_UPDATE_ERROR);
  }

  async saveCity(dto: WeatherBaseDTO): Promise<WeatherResponse> {
    const city = await this.searchCity(dto);

    if (city) {
      return await this.updateCity(dto, city.id);
    }

    const newCity = new Weather();
    Object.assign(newCity, dto);
    return (await newCity.save()) as WeatherResponse;
  }

  async fetchCity(name: string): Promise<WeatherResponse> {
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

    const cityConvert = this.convertToCityID(data);
    const weather = new WeatherBaseDTO();
    Object.assign(weather, cityConvert);

    return await this.saveCity(weather);
  }

  async getCity(dto: GetCityDTO): Promise<WeatherResponse> {
    const nameLowerCase = dto.city.toLowerCase();
    const nameCapitalize =
      nameLowerCase.charAt(0).toUpperCase() + nameLowerCase.slice(1);

    const city = await this.searchCityByName(nameCapitalize);

    if (city) {
      const timeout = new Date(
        new Date(Date.parse(String(city.updatedAt))).valueOf() + 1800000,
      );
      const dateNow = new Date();

      if (timeout > dateNow) {
        console.log(
          `NO NEED TO UPDATE ${nameCapitalize}! NEXT UPDATE AFTER: ${timeout}`,
        );
        return city;
      }
    }

    return await this.fetchCity(nameCapitalize);
  }
}
