import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Weather } from './models/weather.model';
import { GetCityDTO } from './dto/get-city.dto';
import { WeatherResponse } from './response/response';
import { APP_ERRORS } from 'src/common/errors';
import { WeatherBaseDTO } from './dto/weather.base.dto';
import { OpenWeatherService } from 'src/open-weather/open-weather.service';
import { WeatherApiDTO } from 'src/open-weather/dto/weather-api.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather) private weatherRepository: typeof Weather,
    private readonly openWeatherService: OpenWeatherService,
    private readonly configService: ConfigService,
  ) {}

  convertToCityID(dto: WeatherApiDTO): WeatherBaseDTO {
    const { id: cityID, ...metaDate } = dto;
    const weatherBase = new WeatherBaseDTO();
    Object.assign(weatherBase, { cityID, ...metaDate });
    return weatherBase;
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
      console.log(`UPDATE ${city.name}! LAST UPDATE: ${city.updatedAt}`);
      return await this.updateCity(dto, city.id);
    }

    console.log(`CREATE NEW: ${dto.name}! NEXT UPDATE AFTER: ${new Date()}`);
    const newCity = new Weather();
    Object.assign(newCity, dto);
    return (await newCity.save()) as WeatherResponse;
  }

  async getCity(dto: GetCityDTO): Promise<WeatherResponse> {
    const nameLowerCase = dto.city.toLowerCase();
    const nameCapitalize =
      nameLowerCase.charAt(0).toUpperCase() + nameLowerCase.slice(1);

    const city = await this.searchCityByName(nameCapitalize);

    if (city) {
      const timeout = new Date(
        new Date(Date.parse(String(city.updatedAt))).valueOf() +
          this.configService.get('weather_update_timeout'),
      );

      const dateNow = new Date();

      if (timeout > dateNow) {
        console.log(
          `NO NEED TO UPDATE ${nameCapitalize}! NEXT UPDATE AFTER: ${timeout}`,
        );
        return city;
      }
    }

    const response = await this.openWeatherService.fetchCity(nameCapitalize);
    const weather = this.convertToCityID(response);
    return await this.saveCity(weather);
  }
}
