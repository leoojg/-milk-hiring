import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmerModule } from './farmer/farmer.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://mongo_db_user:mongo_db_password@localhost:27017/milk-hiring?authSource=admin',
    ),
    FarmerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
