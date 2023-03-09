import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WeatherUser } from '../models/weather.user.model';
import { ForecastResponse } from '../response/forecast.response';
import { APP_ERRORS } from 'src/common/errors';
import { ICityWeather } from '../interfaces/city-weather.interface';
import { WeatherForecastService } from './weather-forecast.service';
import {
  WeatherByGeoDTO,
  WeatherByNameDTO,
} from 'src/modules/open-weather/dto/weather-geo.dto';

@Injectable()
export class WeatherUserService {
  constructor(
    @InjectModel(WeatherUser)
    private readonly usersRepository: typeof WeatherUser,
    private readonly weatherForecastService: WeatherForecastService,
  ) {}

  private async searchUser(uid: number): Promise<WeatherUser> {
    return await this.usersRepository.findOne({ where: { uid } });
  }

  private async addCity(
    forecast: ForecastResponse,
    uid: number,
  ): Promise<ForecastResponse> {
    const user = await this.searchUser(uid);

    const newCity: ICityWeather = {
      id: forecast.id,
      name: forecast.city.name,
      country: forecast.city.country,
    };

    if (user) {
      const cityId = user.weatherCities.find((city) => city.id === newCity.id);

      if (!cityId) {
        await user.update({
          weatherCities: [...user.weatherCities, newCity],
        });
      }
    } else {
      const weatherUser = new WeatherUser();
      weatherUser.uid = uid;
      weatherUser.weatherCities = [newCity];
      await weatherUser.save();
    }

    return forecast;
  }

  async addCityByName(
    uid: number,
    dto: WeatherByNameDTO,
  ): Promise<ICityWeather[]> {
    const forecast = await this.weatherForecastService.getForecastByName(dto);
    await this.addCity(forecast, uid);
    return (await this.searchUser(uid)).weatherCities;
  }

  async addCityByGeo(
    uid: number,
    dto: WeatherByGeoDTO,
  ): Promise<ICityWeather[]> {
    // throw new BadRequestException(APP_ERRORS.CITY_NOT_FOUND);
    const forecast = await this.weatherForecastService.getForecastByGeo(dto);
    await this.addCity(forecast, uid);
    return (await this.searchUser(uid)).weatherCities;
  }

  async searchCity(id: number, uid: number): Promise<ForecastResponse> {
    const user = await this.searchUser(uid);

    if (user) {
      const city = user.weatherCities.find((city) => city.id === id);

      if (city) {
        return await this.weatherForecastService.getForecastById(id);
      }

      throw new BadRequestException(APP_ERRORS.CITY_NOT_FOUND);
    }
    throw new BadRequestException(APP_ERRORS.USER_NOT_FOUND);
  }

  async dropCity(uid: number, cityId: number): Promise<ICityWeather[]> {
    const user = await this.searchUser(uid);

    if (user) {
      if (user.weatherCities.length > 0) {
        const idxCity = user.weatherCities.findIndex(
          (city) => city.id === cityId,
        );

        if (idxCity >= 0) {
          const arrCities: ICityWeather[] = JSON.parse(
            JSON.stringify(user.weatherCities),
          );
          arrCities.splice(idxCity, 1);
          user.update({ weatherCities: arrCities });
          return user.weatherCities;
        }
      }

      throw new BadRequestException(APP_ERRORS.CITY_NOT_FOUND);
    }

    throw new BadRequestException(APP_ERRORS.USER_NOT_FOUND);
  }

  async getCities(uid: number): Promise<ICityWeather[]> {
    const user = await this.searchUser(uid);

    if (!!user) {
      return user.weatherCities;
    }

    return [];
  }
}
