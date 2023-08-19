import { Type } from 'class-transformer';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { FarmProps } from 'src/@core/domain/farm/farm.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFarmDto implements FarmProps {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty()
  @IsString()
  farmerId: string;

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  distanceToFactory: number;
}
