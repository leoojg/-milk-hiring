import { IsString, MinLength } from 'class-validator';
import { FarmerProps } from 'src/@core/domain/farmer/farmer.entity';

export class CreateFarmerDto implements FarmerProps {
  @IsString()
  @MinLength(3)
  name: string;
}
