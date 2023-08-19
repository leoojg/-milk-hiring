import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { FarmerUseCases } from 'src/@core/application/farmer.use-cases';
import { FarmerRepositoryInterface } from 'src/@core/domain/farmer/farmer.repository';
import { FarmController } from './farm/farm.controller';
import { FarmService } from './farm/farm.service';
import { FarmUseCases } from 'src/@core/application/farm.use-cases';
import { MilkProductionUseCases } from 'src/@core/application/milk-production.use-cases';
import { FarmRepositoryInterface } from 'src/@core/domain/farm/farm.repository';
import { MilkProductionRepositoryInterface } from 'src/@core/domain/milk-production/milk-production.repository';
import { MilkProductionService } from './farm/milk-production/milk-production.service';
import { MilkProductionController } from './farm/milk-production/milk-production.controller';
import { FarmMongooseRepository } from 'src/database/farm.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { FarmEntity, FarmSchema } from 'src/schemas/farm.entity';
import { FarmerMongooseRepository } from 'src/database/farmer.repository';
import { FarmerEntity, FarmerSchema } from 'src/schemas/farmer.entity';
import { MilkProductionMongooseRepository } from 'src/database/milk-production.repository';
import {
  MilkProductionEntity,
  MilkProductionSchema,
} from 'src/schemas/milk-production.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FarmerEntity.name, schema: FarmerSchema },
      { name: FarmEntity.name, schema: FarmSchema },
      { name: MilkProductionEntity.name, schema: MilkProductionSchema },
    ]),
  ],
  controllers: [FarmerController, FarmController, MilkProductionController],
  providers: [
    FarmerService,
    FarmService,
    MilkProductionService,
    FarmerMongooseRepository,
    FarmMongooseRepository,
    MilkProductionMongooseRepository,
    {
      provide: FarmerUseCases,
      useFactory: (farmerRepository: FarmerRepositoryInterface) =>
        new FarmerUseCases(farmerRepository),
      inject: [FarmerMongooseRepository],
    },
    {
      provide: FarmUseCases,
      useFactory: (farmRepository: FarmRepositoryInterface) =>
        new FarmUseCases(farmRepository),
      inject: [FarmMongooseRepository],
    },
    {
      provide: MilkProductionUseCases,
      useFactory: (
        milkProductionRepository: MilkProductionRepositoryInterface,
      ) => new MilkProductionUseCases(milkProductionRepository),
      inject: [MilkProductionMongooseRepository],
    },
  ],
})
export class FarmerModule {}
