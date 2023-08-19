import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { FarmerUseCases } from 'src/@core/application/farmer.use-cases';
import { FarmerRepositoryInterface } from 'src/@core/domain/farmer/farmer.repository';
import { BaseInMemoryRepository } from 'src/@core/infra/db/in-memory/base.repository';
import { MilkProductionController } from './milk-production/milk-production.controller';
import { MilkProductionUseCases } from 'src/@core/application/milk-production.use-cases';
import { MilkProductionRepositoryInterface } from 'src/@core/domain/milk-production/milk-production.repository';
import { MilkProductionInMemoryRepository } from 'src/@core/infra/db/in-memory/milk-production.repository';
import { MilkProductionService } from './milk-production/milk-production.service';

@Module({
  controllers: [FarmerController, MilkProductionController],
  providers: [
    FarmerService,
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
      provide: FarmerUseCases,
      useFactory: (farmerRepository: FarmerRepositoryInterface) =>
        new FarmerUseCases(farmerRepository),
      inject: [BaseInMemoryRepository],
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