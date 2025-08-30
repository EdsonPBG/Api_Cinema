import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { SeatPaginationDto } from './dto/pagination-seat.dto';

@Controller('seats')
export class SeatsController {
  constructor(private readonly seatsService: SeatsService) {}

  @Post()
    create(
      @Body() createSeatDto: CreateSeatDto
    ) {
      return this.seatsService.create(createSeatDto);
  }

  @Get()
    findAll(@Query() seatPaginationDto: SeatPaginationDto) {
      return this.seatsService.findAll(seatPaginationDto);
  }

  @Get(':id')
    findOne(
      @Param('id') id: string
    ) {
      return this.seatsService.findOne(id);
  }

  @Patch(':id')
    update(
      @Param('id') id: string, 
      @Body() updateSeatDto: UpdateSeatDto
    ) {
      return this.seatsService.update(id, updateSeatDto);
  }

  @Delete(':id')
    remove(
      @Param('id') id: string
    ) {
      return this.seatsService.remove(id);
  }
}
