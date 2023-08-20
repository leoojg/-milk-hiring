import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class YearlyReportDto {
  @ApiProperty({
    minimum: 1900,
    maximum: 2900,
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  year: number;
}
