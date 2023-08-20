import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { FarmService } from './farm.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { MonthlyReportDto } from './dto/monthly-report.dto';
import { YearlyReportDto } from './dto/yearly-report.dto';

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

  @Get(':id/montly-production')
  async getMonthlyProduction(
    @Param('farmerId') farmerId: string,
    @Param('id') id: string,
    @Query() monthlyReportDto: MonthlyReportDto,
  ) {
    await this.farmService.findOne(farmerId, id);
    return this.farmService.getMonthlyProduction(
      id,
      monthlyReportDto.year,
      monthlyReportDto.month,
    );
  }

  @Get(':id/montly-price-report')
  async getMonthlyReport(
    @Param('farmerId') farmerId: string,
    @Param('id') id: string,
    @Query() monthlyReportDto: MonthlyReportDto,
  ) {
    await this.farmService.findOne(farmerId, id);
    return this.farmService.getMonthlyReport(
      id,
      monthlyReportDto.year,
      monthlyReportDto.month,
    );
  }

  @Get(':id/yearly-report')
  async getYearlyReport(
    @Param('farmerId') farmerId: string,
    @Param('id') id: string,
    @Query() yearlyReportDto: YearlyReportDto,
  ) {
    await this.farmService.findOne(farmerId, id);
    return this.farmService.getYearlyReport(id, yearlyReportDto.year);
  }
}
