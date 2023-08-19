import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsISO8601, IsNumber, IsString } from 'class-validator';
import { MilkProductionProps } from 'src/@core/domain/milk-production/milk-production.entity';

export class CreateMilkProductionDto implements MilkProductionProps {
  @ApiProperty()
  @IsString()
  farmId: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsISO8601()
  @Type(() => Date)
  date: Date;
}
