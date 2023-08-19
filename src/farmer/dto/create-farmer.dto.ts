import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';
import { FarmerProps } from 'src/@core/domain/farmer/farmer.entity';

export class CreateFarmerDto implements FarmerProps {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  name: string;
}
