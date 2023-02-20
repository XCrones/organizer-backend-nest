import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const PORT = process.env.SERVER_PORT;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:5173',
      credentials: true,
    },
  });
  await app.listen(PORT || 4443);
}
bootstrap();
