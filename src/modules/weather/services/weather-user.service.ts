import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WeatherUser } from '../models/weather.user.model';
import { ForecastResponse } from '../response/forecast.response';
import { APP_ERRORS } from 'src/common/errors';
import { ICityWeather } from '../interfaces/city-weather.interface';

@Injectable()
export class WeatherUserService {
  constructor(
    @InjectModel(WeatherUser)
    private readonly weatherUserRepository: typeof WeatherUser,
  ) {}

  async addCity(
    uid: number,
    forecast: ForecastResponse,
  ): Promise<ForecastResponse> {
    const user = await this.weatherUserRepository.findOne({ where: { uid } });

    const newCity: ICityWeather = {
      id: forecast.id,
      name: forecast.city.name,
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

  async dropCity(uid: number, cityId: number): Promise<ICityWeather[]> {
    const user = await this.weatherUserRepository.findOne({ where: { uid } });

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
    const arrCities = await this.weatherUserRepository.findOne({
      where: { uid },
    });

    return arrCities.weatherCities;
  }
}
