import { Type } from 'class-transformer';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { FarmProps } from 'src/@core/domain/farm/farm.entity';

export class CreateFarmDto implements FarmProps {
  @IsString()
  @MinLength(3)
  name: string;

  @IsString()
  farmerId: string;

  @Type(() => Number)
  @IsNumber()
  distanceToFactory: number;
}
