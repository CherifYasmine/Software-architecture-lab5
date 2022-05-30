import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

const logger = new Logger('Main');

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.REDIS,
//     options: { port: 6379 },
//   });
//   app.connectMicroservice<MicroserviceOptions>({
//     transport: Transport.TCP,
//     options: { port: 3002 },
//   });
//   // await app.startAllMicroservices();
//   await app.listen(3001);
// }
// bootstrap();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.REDIS,
      options: {
        url: 'redis://localhost:6379',
      }
    }
  )
  await app.listen();
}
bootstrap();