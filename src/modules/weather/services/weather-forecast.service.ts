import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { APP_ERRORS } from 'src/common/errors';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherService } from '../../open-weather/open-weather.service';
import { WeatherForecastDTO } from '../../open-weather/dto/weather-forecast.dto';
import { ForecastResponse } from '../response/forecast.response';
import { WeatherForecast } from '../models/weather-forecast.model';
import { Op } from 'sequelize';
import {
  WeatherByGeoDTO,
  WeatherByNameDTO,
} from 'src/modules/open-weather/dto/weather-geo.dto';

@Injectable()
export class WeatherForecastService {
  constructor(
    @InjectModel(WeatherForecast)
    private readonly repository: typeof WeatherForecast,
    private readonly openWeatherService: OpenWeatherService,
    private readonly configService: ConfigService,
  ) {}

  private async convertToBaseDTO(
    dto: WeatherForecastDTO,
  ): Promise<WeatherForecastDTO> {
    dto.list.forEach((city) => {
      if (city.weather[0]) {
        const iconBaseUrl = this.configService.get('weather_url_icon');
        const iconPostfix = this.configService.get('weather_icon_postfix');
        const iconUrl = `${iconBaseUrl}/${city.weather[0].icon}${iconPostfix}`;

        city.weather[0].icon = iconUrl;
      }

      if (!city.rain) {
        city.rain = null;
      }

      if (!city.snow) {
        city.snow = null;
      }

      if (!city.clouds) {
        city.clouds = null;
      }
    });

    return dto;
  }

  async searchByCityName(name: string): Promise<ForecastResponse | null> {
    return (await this.repository.findOne({
      where: {
        city: {
          [Op.contains]: {
            name,
          },
        },
      },
    })) as ForecastResponse;
  }

  async searchById(id: number): Promise<ForecastResponse | null> {
    return (await this.repository.findOne({
      where: { id },
    })) as ForecastResponse;
  }

  async searchByCityId(cityId: number): Promise<ForecastResponse | null> {
    return (await this.repository.findOne({
      where: {
        city: {
          [Op.contains]: {
            id: cityId,
          },
        },
      },
    })) as ForecastResponse;
  }

  async searchByCityGeo(
    dto: WeatherByGeoDTO,
  ): Promise<ForecastResponse | null> {
    return (await this.repository.findOne({
      where: {
        city: {
          [Op.contains]: {
            coord: {
              lat: dto.lat,
              lon: dto.lon,
            },
          },
        },
      },
    })) as ForecastResponse;
  }

  private async updateForecast(
    dto: WeatherForecastDTO,
    id: number,
  ): Promise<ForecastResponse> {
    const result = await this.repository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });
    const [count, item] = result;
    const payload = item[0] as ForecastResponse;

    if (payload) {
      return payload;
    }
    throw new BadRequestException(APP_ERRORS.CITY_UPDATE_ERROR);
  }

  private async saveForecast(
    dto: WeatherForecastDTO,
  ): Promise<ForecastResponse> {
    const forecastConvert = await this.convertToBaseDTO(dto);
    const city = await this.searchByCityId(forecastConvert.city.id);

    if (city) {
      console.log(
        `UPDATE FORECAST ${forecastConvert.city.name}! LAST UPDATE: ${city.updatedAt}`,
      );

      return await this.updateForecast(forecastConvert, city.id);
    }

    console.log(
      `CREATE NEW FORECAST: ${
        forecastConvert.city.name
      }! NEXT UPDATE AFTER: ${new Date()}`,
    );
    const newCity = new WeatherForecast();
    Object.assign(newCity, forecastConvert);
    return (await newCity.save()) as ForecastResponse;
  }

  private checkTimeout(forecast: ForecastResponse | null) {
    if (forecast) {
      const timeout = Math.max(
        1800000,
        +this.configService.get('weather_update_timeout'),
      );
      const DateTimeout = new Date(
        new Date(Date.parse(String(forecast.updatedAt))).valueOf() + timeout,
      );

      const dateNow = new Date();

      if (DateTimeout > dateNow) {
        console.log(
          `NO NEED TO UPDATE FORECAST ${forecast.city.name}! NEXT UPDATE AFTER: ${DateTimeout}`,
        );
        return false;
      }
    }

    return true;
  }

  async getForecastByCityId(cityId: number) {
    return await this.searchByCityId(cityId);
  }

  async getForecastByName(dto: WeatherByNameDTO): Promise<ForecastResponse> {
    const nameLowerCase = dto.city.toLowerCase();
    const nameCapitalize =
      nameLowerCase.charAt(0).toUpperCase() + nameLowerCase.slice(1);

    const forecast = await this.searchByCityName(nameCapitalize);

    const isUpdate = this.checkTimeout(forecast);

    if (!isUpdate) {
      return forecast;
    }

    const resForecast: WeatherForecastDTO =
      await this.openWeatherService.fetchWeatherByName(
        nameCapitalize,
        'forecast',
      );

    return await this.saveForecast(resForecast);
  }

  async getForecastByGeo(dto: WeatherByGeoDTO): Promise<ForecastResponse> {
    const forecast = await this.searchByCityGeo(dto);
    const isUpdate = this.checkTimeout(forecast);

    if (!isUpdate) {
      return forecast;
    }

    const resForecast: WeatherForecastDTO =
      await this.openWeatherService.fetchWeatherByGeo(dto, 'forecast');

    return await this.saveForecast(resForecast);
  }

  async getForecastById(id: number): Promise<ForecastResponse> {
    const forecast = await this.searchById(id);
    const isUpdate = this.checkTimeout(forecast);

    if (!isUpdate) {
      return forecast;
    }

    const geoDTO = new WeatherByGeoDTO();
    Object.assign(geoDTO, forecast.city.coord);

    const resForecast: WeatherForecastDTO =
      await this.openWeatherService.fetchWeatherByGeo(geoDTO, 'forecast');

    return await this.saveForecast(resForecast);
  }
}
