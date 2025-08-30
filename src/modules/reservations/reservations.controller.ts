import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservaPaginationDto } from './dto/pagination-reserva.dto';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
    create(
      @Body() createReservationDto: CreateReservationDto
    ) {
      return this.reservationsService.create(createReservationDto);
  }

  @Get()
    findAll(@Query() reservaPaginationDto: ReservaPaginationDto) {
      return this.reservationsService.findAll(reservaPaginationDto);
    }

  @Get(':id')
    findOne(  @Param('id') id: string 
  ) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
    update(
      @Param('id') id: string, 
      @Body() updateReservationDto: UpdateReservationDto) {
        return this.reservationsService.update(id, updateReservationDto);
    }

  @Delete(':id')
    remove(
      @Param('id') id: string
    ) {
      return this.reservationsService.remove(id);
  }
}
