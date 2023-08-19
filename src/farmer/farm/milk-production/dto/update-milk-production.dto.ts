import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsISO8601, IsOptional } from 'class-validator';
import { CreateMilkProductionDto } from './create-milk-production.dto';

export class UpdateMilkProductionDto implements CreateMilkProductionDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  amount: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsISO8601()
  @Type(() => Date)
  date: Date;
}
