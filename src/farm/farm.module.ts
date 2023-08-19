import { Module } from '@nestjs/common';
import { FarmService } from './farm.service';
import { FarmController } from './farm.controller';
import { FarmUseCases } from 'src/@core/application/farm.use-cases';
import { FarmRepositoryInterface } from 'src/@core/domain/farm/farm.repository';
import { BaseInMemoryRepository } from 'src/@core/infra/db/in-memory/base.repository';

@Module({
  controllers: [FarmController],
  providers: [
    FarmService,
    {
      provide: BaseInMemoryRepository,
      useClass: BaseInMemoryRepository,
    },
    {
      provide: FarmUseCases,
      useFactory: (farmRepository: FarmRepositoryInterface) =>
        new FarmUseCases(farmRepository),
      inject: [BaseInMemoryRepository],
    },
  ],
})
export class FarmModule {}
