import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString, MinLength } from 'class-validator';
import { FarmProps } from 'src/@core/domain/farm/farm.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto implements Omit<FarmProps, 'farmerId'> {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  distanceToFactory: number;
}
