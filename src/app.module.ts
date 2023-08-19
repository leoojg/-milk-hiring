import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmModule } from './farm/farm.module';
import { FarmerModule } from './farmer/farmer.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo_db_user:mongo_db_password@mongodb/milk-hiring?authSource=admin',
    ),
    FarmModule,
    FarmerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
