import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [MongooseModule.forRoot("mongodb://localhost/subscription"), UserModule, ProductModule,ClientsModule.register([
    {
      name: 'REDISCLIENT',
      transport: Transport.REDIS,
      options : {
        url: 'redis://localhost:6379',
      }
    },
  ]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
