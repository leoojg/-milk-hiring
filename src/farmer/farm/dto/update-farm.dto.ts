import { CreateFarmDto } from './create-farm.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, MinLength, IsNumber, IsOptional } from 'class-validator';

export class UpdateFarmDto implements CreateFarmDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  distanceToFactory: number;
}
