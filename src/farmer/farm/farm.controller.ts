import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';

@Controller('farmer/:farmerId/farm')
export class FarmController {
  constructor(private readonly farmService: FarmService) {}

  @Post()
  create(
    @Param('farmerId') farmerId: string,
    @Body() createFarmDto: CreateFarmDto,
  ) {
    return this.farmService.create(farmerId, createFarmDto);
  }

  @Get()
  findAll(@Param('farmerId') farmerId: string) {
    return this.farmService.findAll(farmerId);
  }

  @Get(':id')
  findOne(@Param('farmerId') farmerId: string, @Param('id') id: string) {
    return this.farmService.findOne(farmerId, id);
  }

  @Patch(':id')
  update(
    @Param('farmerId') farmerId: string,
    @Param('id') id: string,
    @Body() updateFarmDto: UpdateFarmDto,
  ) {
    return this.farmService.update(farmerId, id, updateFarmDto);
  }

  @Delete(':id')
  remove(@Param('farmerId') farmerId: string, @Param('id') id: string) {
    return this.farmService.remove(farmerId, id);
  }
}
