import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WeatherUser } from '../models/weather.user.model';
import { ForecastResponse } from '../response/forecast.response';
import { APP_ERRORS } from 'src/common/errors';

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

    if (user) {
      const cityId = user.citiesId.find((id) => id === forecast.id);
      if (!cityId) {
        await user.update({ citiesId: [...user.citiesId, forecast.id] });
      }
    } else {
      const weatherUser = new WeatherUser();
      weatherUser.uid = uid;
      weatherUser.citiesId = [forecast.id];
      await weatherUser.save();
    }

    return forecast;
  }

  async dropCity(uid: number, cityId: number): Promise<number[]> {
    const user = await this.weatherUserRepository.findOne({ where: { uid } });

    if (user) {
      if (user.citiesId.length > 0) {
        const idxCity = user.citiesId.findIndex((id) => id === cityId);

        if (idxCity >= 0) {
          const arrCities = JSON.parse(JSON.stringify(user.citiesId));
          arrCities.splice(idxCity, 1);
          user.update({ citiesId: arrCities });
          return user.citiesId;
        }
      }

      throw new BadRequestException(APP_ERRORS.CITY_NOT_FOUND);
    }

    throw new BadRequestException(APP_ERRORS.USER_NOT_FOUND);
  }
}
