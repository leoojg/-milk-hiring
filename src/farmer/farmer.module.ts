import { Module } from '@nestjs/common';
import { FarmerService } from './farmer.service';
import { FarmerController } from './farmer.controller';
import { FarmerUseCases } from 'src/@core/application/farmer.use-cases';
import { FarmerRepositoryInterface } from 'src/@core/domain/farmer/farmer.repository';
import { BaseInMemoryRepository } from 'src/@core/infra/db/in-memory/base.repository';

@Module({
  controllers: [FarmerController],
  providers: [
    FarmerService,
    {
      provide: BaseInMemoryRepository,
      useClass: BaseInMemoryRepository,
    },
    {
      provide: FarmerUseCases,
      useFactory: (farmerRepository: FarmerRepositoryInterface) =>
        new FarmerUseCases(farmerRepository),
      inject: [BaseInMemoryRepository],
    },
  ],
})
export class FarmerModule {}
