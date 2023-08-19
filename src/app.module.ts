import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmerModule } from './farmer/farmer.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const mongoDbUser = configService.getOrThrow('MONGO_DB_USER');
        const mongoDbPassword = configService.getOrThrow('MONGO_DB_PASSWORD');
        const mongoDbHost = configService.getOrThrow('MONGO_DB_HOST');
        const mongoDbPort = configService.get('MONGO_DB_PORT') ?? 27017;
        return {
          uri: `mongodb://${mongoDbUser}:${mongoDbPassword}@${mongoDbHost}:${mongoDbPort}/milk-hiring?authSource=admin`,
        };
      },
    }),
    FarmerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
