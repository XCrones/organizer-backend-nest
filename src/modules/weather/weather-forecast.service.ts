import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GetWeatherDTO } from './dto/get-weather.dto';
import { APP_ERRORS } from 'src/common/errors';
import { ConfigService } from '@nestjs/config';
import { OpenWeatherService } from '../open-weather/open-weather.service';
import { WeatherForecastDTO } from '../open-weather/dto/weather-forecast.dto';
import { ForecastResponse } from './response/forecast.response';
import { WeatherForecast } from './models/weather-forecast.model';
import { Op } from 'sequelize';

@Injectable()
export class WeatherForecastService {
  constructor(
    @InjectModel(WeatherForecast)
    private readonly repository: typeof WeatherForecast,
    private readonly openWeatherService: OpenWeatherService,
    private readonly configService: ConfigService,
  ) {}

  async convertToBaseDTO(dto: WeatherForecastDTO): Promise<WeatherForecastDTO> {
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

  async searchCityByName(name: string): Promise<ForecastResponse | null> {
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

  async searchCityByID(cityID: number): Promise<ForecastResponse | null> {
    return (await this.repository.findOne({
      where: {
        where: {
          city: {
            [Op.contains]: {
              id: cityID,
            },
          },
        },
      },
    })) as ForecastResponse;
  }

  async updateForecast(
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

  async saveForecast(dto: WeatherForecastDTO): Promise<ForecastResponse> {
    const city = await this.searchCityByID(dto.city.id);

    if (city) {
      console.log(
        `UPDATE FORECAST ${dto.city.name}! LAST UPDATE: ${city.updatedAt}`,
      );

      return await this.updateForecast(dto, city.id);
    }

    console.log(
      `CREATE NEW FORECAST: ${dto.city.name}! NEXT UPDATE AFTER: ${new Date()}`,
    );
    const newCity = new WeatherForecast();
    Object.assign(newCity, dto);
    return (await newCity.save()) as ForecastResponse;
  }

  async getForecast(dto: GetWeatherDTO): Promise<ForecastResponse> {
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
          `NO NEED TO UPDATE FORECAST ${nameCapitalize}! NEXT UPDATE AFTER: ${DateTimeout}`,
        );
        return city;
      }
    }

    const response = await this.openWeatherService.fetchForecast(
      nameCapitalize,
    );

    const responseMakingIcon = await this.convertToBaseDTO(response);

    return await this.saveForecast(responseMakingIcon);
  }
}
