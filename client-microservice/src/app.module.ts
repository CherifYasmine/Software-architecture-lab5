import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { UserService } from './user/user.service';
import { Product } from './product/entity/product.entity';
import { ProductService } from './product/product.service';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'tp5',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),TypeOrmModule.forFeature([UserEntity, Product]),
    UserModule, ProductModule,
    ClientsModule.register([
      {name: 'REDISCLIENT',
      transport: Transport.REDIS,
      options : {
        url: 'redis://localhost:6379',
      }
    }
    ])
  ],
  controllers: [AppController],
  providers: [AppService, UserService, ProductService],
})
export class AppModule {}
