import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WeatherCurrent } from './models/weather-current.model';
import { CurrentResponse } from './response/current.response';
import { APP_ERRORS } from 'src/common/errors';
import { WeatherCurrentBaseDTO } from './dto/weather-current.base.dto';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherService } from '../open-weather/open-weather.service';
import { WeatherCurrentApiDTO } from '../open-weather/dto/weather-current-api.dto';
import { WeatherByNameDTO } from '../open-weather/dto/weather-geo.dto';

@Injectable()
export class WeatherCurrentService {
  constructor(
    @InjectModel(WeatherCurrent)
    private readonly weatherCurrentRepository: typeof WeatherCurrent,
    private readonly openWeatherService: OpenWeatherService,
    private readonly configService: ConfigService,
  ) {}

  convertToBaseDTO(dto: WeatherCurrentApiDTO): WeatherCurrentBaseDTO {
    const { id: cityID, ...metaDate } = dto;

    const weatherBase = new WeatherCurrentBaseDTO();
    Object.assign(weatherBase, { cityID, ...metaDate });

    if (weatherBase.weather[0]) {
      const iconBaseUrl = this.configService.get('weather_url_icon');
      const iconPostfix = this.configService.get('weather_icon_postfix');
      const iconUrl = `${iconBaseUrl}/${weatherBase.weather[0].icon}${iconPostfix}`;

      weatherBase.weather[0].icon = iconUrl;
    }

    if (!weatherBase.rain) {
      weatherBase.rain = null;
    }

    if (!weatherBase.snow) {
      weatherBase.snow = null;
    }

    if (!weatherBase.clouds) {
      weatherBase.clouds = null;
    }
    return weatherBase;
  }

  async searchCityByName(name: string): Promise<CurrentResponse | null> {
    return (await this.weatherCurrentRepository.findOne({
      where: { name },
    })) as CurrentResponse;
  }

  async searchCityByID(cityID: number): Promise<CurrentResponse | null> {
    return (await this.weatherCurrentRepository.findOne({
      where: { cityID },
    })) as CurrentResponse;
  }

  async updateCurrent(
    dto: WeatherCurrentBaseDTO,
    id: number,
  ): Promise<CurrentResponse> {
    const result = await this.weatherCurrentRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    const [count, item] = result;
    const payload = item[0] as CurrentResponse;

    if (payload) {
      return payload;
    }
    throw new BadRequestException(APP_ERRORS.CITY_UPDATE_ERROR);
  }

  async saveCurrent(dto: WeatherCurrentBaseDTO): Promise<CurrentResponse> {
    const city = await this.searchCityByID(dto.cityID);

    if (city) {
      console.log(
        `UPDATE CURRENT ${city.name}! LAST UPDATE: ${city.updatedAt}`,
      );
      return await this.updateCurrent(dto, city.id);
    }

    console.log(
      `CREATE NEW CURRENT: ${dto.name}! NEXT UPDATE AFTER: ${new Date()}`,
    );
    const newCity = new WeatherCurrent();
    Object.assign(newCity, dto);
    return (await newCity.save()) as CurrentResponse;
  }

  async getCurrent(dto: WeatherByNameDTO): Promise<CurrentResponse> {
    const nameLowerCase = dto.city.toLowerCase();
    const nameCapitalize =
      nameLowerCase.charAt(0).toUpperCase() + nameLowerCase.slice(1);

    const city = await this.searchCityByName(nameCapitalize);

    if (city) {
      const timeout = Math.max(
        1800000,
        +this.configService.get('weather_update_timeout'),
      );
      const DateTimeout = new Date(
        new Date(Date.parse(String(city.updatedAt))).valueOf() + timeout,
      );

      const dateNow = new Date();

      if (DateTimeout > dateNow) {
        console.log(
          `NO NEED TO UPDATE CURRENT ${nameCapitalize}! NEXT UPDATE AFTER: ${DateTimeout}`,
        );
        return city;
      }
    }

    const resWeather: WeatherCurrentApiDTO =
      await this.openWeatherService.fetchWeatherByName(
        nameCapitalize,
        'weather',
      );

    const weatherConverted = this.convertToBaseDTO(resWeather);
    return await this.saveCurrent(weatherConverted);
  }
}
