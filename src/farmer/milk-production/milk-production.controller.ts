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

@Controller('farmer/:farmerId/milk-production')
export class MilkProductionController {
  constructor(private readonly milkProductionService: MilkProductionService) {}

  @Post()
  create(@Body() createMilkProductionDto: CreateMilkProductionDto) {
    return this.milkProductionService.create(createMilkProductionDto);
  }

  @Get()
  findAll(@Param('farmerId') farmerId: string) {
    return this.milkProductionService.findAll(farmerId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.milkProductionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMilkProductionDto: UpdateMilkProductionDto,
  ) {
    return this.milkProductionService.update(id, updateMilkProductionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.milkProductionService.remove(id);
  }
}
