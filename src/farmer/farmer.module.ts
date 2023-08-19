import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { FarmerUseCases } from 'src/@core/application/farmer.use-cases';
import { FarmerRepositoryInterface } from 'src/@core/domain/farmer/farmer.repository';
import { BaseInMemoryRepository } from 'src/@core/infra/db/in-memory/base.repository';
import { FarmController } from './farm/farm.controller';
import { FarmService } from './farm/farm.service';
import { FarmUseCases } from 'src/@core/application/farm.use-cases';
import { MilkProductionUseCases } from 'src/@core/application/milk-production.use-cases';
import { FarmRepositoryInterface } from 'src/@core/domain/farm/farm.repository';
import { MilkProductionRepositoryInterface } from 'src/@core/domain/milk-production/milk-production.repository';
import { MilkProductionInMemoryRepository } from 'src/@core/infra/db/in-memory/milk-production.repository';
import { MilkProductionService } from './farm/milk-production/milk-production.service';
import { MilkProductionController } from './farm/milk-production/milk-production.controller';
import { FarmInMemoryRepository } from 'src/@core/infra/db/in-memory/farm.repository';

@Module({
  controllers: [FarmerController, FarmController, MilkProductionController],
  providers: [
    FarmerService,
    FarmService,
    MilkProductionService,
    {
      provide: BaseInMemoryRepository,
      useClass: BaseInMemoryRepository,
    },
    {
      provide: MilkProductionInMemoryRepository,
      useClass: MilkProductionInMemoryRepository,
    },
    {
      provide: FarmInMemoryRepository,
      useClass: FarmInMemoryRepository,
    },
    {
      provide: FarmerUseCases,
      useFactory: (farmerRepository: FarmerRepositoryInterface) =>
        new FarmerUseCases(farmerRepository),
      inject: [BaseInMemoryRepository],
    },
    {
      provide: FarmUseCases,
      useFactory: (farmRepository: FarmRepositoryInterface) =>
        new FarmUseCases(farmRepository),
      inject: [FarmInMemoryRepository],
    },
    {
      provide: MilkProductionUseCases,
      useFactory: (
        milkProductionRepository: MilkProductionRepositoryInterface,
      ) => new MilkProductionUseCases(milkProductionRepository),
      inject: [MilkProductionInMemoryRepository],
    },
  ],
})
export class FarmerModule {}
