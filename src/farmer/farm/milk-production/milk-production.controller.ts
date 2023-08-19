import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MilkProductionService } from './milk-production.service';
import { CreateMilkProductionDto } from './dto/create-milk-production.dto';
import { UpdateMilkProductionDto } from './dto/update-milk-production.dto';
import { FarmService } from '../farm.service';

@Controller('farmer/:farmerId/farm/:farmId/milk-production')
export class MilkProductionController {
  constructor(
    private readonly milkProductionService: MilkProductionService,
    private readonly farmService: FarmService,
  ) {}

  @Post()
  async create(
    @Param('farmerId') farmerId: string,
    @Param('farmId') farmId: string,
    @Body() createMilkProductionDto: CreateMilkProductionDto,
  ) {
    await this.farmService.findOne(farmerId, farmId);
    return this.milkProductionService.create(farmId, createMilkProductionDto);
  }

  @Get()
  async findAll(
    @Param('farmerId') farmerId: string,
    @Param('farmId') farmId: string,
  ) {
    await this.farmService.findOne(farmerId, farmId);
    return this.milkProductionService.findAll(farmId);
  }

  @Get(':id')
  async findOne(
    @Param('farmerId') farmerId: string,
    @Param('farmId') farmId: string,
    @Param('id') id: string,
  ) {
    await this.farmService.findOne(farmerId, farmId);
    return this.milkProductionService.findOne(farmId, id);
  }

  @Patch(':id')
  async update(
    @Param('farmerId') farmerId: string,
    @Param('farmId') farmId: string,
    @Param('id') id: string,
    @Body() updateMilkProductionDto: UpdateMilkProductionDto,
  ) {
    await this.farmService.findOne(farmerId, farmId);
    return this.milkProductionService.update(
      farmId,
      id,
      updateMilkProductionDto,
    );
  }

  @Delete(':id')
  async remove(
    @Param('farmerId') farmerId: string,
    @Param('farmId') farmId: string,
    @Param('id') id: string,
  ) {
    await this.farmService.findOne(farmerId, farmId);
    return this.milkProductionService.remove(farmId, id);
  }
}
