import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class MonthlyReportDto {
  @ApiProperty({
    minimum: 1900,
    maximum: 2900,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  year: number;

  @ApiProperty({
    minimum: 1,
    maximum: 12,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  month: number;
}
