import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Weather } from './models/weather.model';
import { GetCityDTO } from './dto/get-city.dto';
import { WeatherResponse } from './response/response';
import { APP_ERRORS } from 'src/common/errors';
import { SaveCityDTO } from './dto/save-city.dto';
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';
import { UpdateCityDTO } from './dto/update-city.dto';

@Injectable()
export class WeatherService {
  constructor(
    @InjectModel(Weather) private weatherRepository: typeof Weather,
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async searchCityByName(name: string): Promise<WeatherResponse | null> {
    return (await this.weatherRepository.findOne({
      where: { name },
    })) as WeatherResponse;
  }

  async searchCity(dto: SaveCityDTO): Promise<WeatherResponse | null> {
    return (await this.weatherRepository.findOne({
      where: { name: dto.name, cityID: dto.id },
    })) as WeatherResponse;
  }

  async updateCity(dto: WeatherResponse): Promise<WeatherResponse> {
    const result = await this.weatherRepository.update(
      { ...dto },
      {
        where: {
          cityID: dto.cityID,
          name: dto.name,
        },
        returning: true,
      },
    );
    const [count, item] = result;
    const payload = item[0] as WeatherResponse;
    if (payload) {
      return payload;
    }
    throw new BadRequestException('err save city'); //APP_ERRORS.CITY_NOT_FOUND
  }

  async saveCity(dto: SaveCityDTO): Promise<WeatherResponse> {
    const city = await this.searchCity(dto);

    if (city) {
      return await this.updateCity(city);
    }

    const { id: cityID, ...metaDate } = dto;

    const newCity = new Weather();
    Object.assign(newCity, { cityID, ...metaDate } as UpdateCityDTO);
    return (await newCity.save()) as WeatherResponse;
  }

  async fetchCity(name: string): Promise<WeatherResponse> {
    const city = await this.searchCityByName(name);

    console.log(
      new Date(Date.parse(String(city.updatedAt))).toLocaleTimeString(),
    );
    console.log(new Date().toLocaleTimeString());

    // const urlApi = this.configService.get('weather_url_api');
    // const token = this.configService.get('weather_token');
    // const { data } = await firstValueFrom(
    //   this.httpService
    //     .get<SaveCityDTO>(`${urlApi}?q=${name}&units=metric&appid=${token}`)
    //     .pipe(
    //       catchError((error: AxiosError) => {
    //         // throw error;
    //         throw new BadRequestException(APP_ERRORS.CITY_NOT_FOUND);
    //       }),
    //     ),
    // );

    // return await this.saveCity(data);
    return city;
  }

  async getCity(dto: GetCityDTO): Promise<WeatherResponse> {
    return await this.fetchCity(dto.city);
  }
}
