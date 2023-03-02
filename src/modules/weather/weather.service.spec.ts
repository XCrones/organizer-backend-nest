import { Test, TestingModule } from '@nestjs/testing';
import { WeatherCurrentService } from './weather-current.service';

describe('WeatherService', () => {
  let service: WeatherCurrentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherCurrentService],
    }).compile();

    service = module.get<WeatherCurrentService>(WeatherCurrentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
