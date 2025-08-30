import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CinemaHallService } from './cinema-hall.service';
import { CreateCinemaHallDto } from './dto/create-cinema-hall.dto';
import { UpdateCinemaHallDto } from './dto/update-cinema-hall.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { CinemaHallPaginationDto } from './dto/pagination-cinema-hall.dto';

@UseGuards(AuthDto)
@Controller('cinema-hall')
export class CinemaHallController {
  constructor(private readonly cinemaHallService: CinemaHallService) {}

  @Post()
    create(
      @Body()
        createCinemaHallDto: CreateCinemaHallDto
        ) {
            return this.cinemaHallService.create(createCinemaHallDto);
    }

  @Get()
    findAll(@Query() cinemaHallPagination: CinemaHallPaginationDto) {
      return this.cinemaHallService.findAll(cinemaHallPagination);
    }

  @Get(':id')
    findOne(
      @Param('id') id: string
    ) {
      return this.cinemaHallService.findOne(id);
    }

  @Patch(':id')
    update(
      @Param('id') id: string, 
      @Body() updateCinemaHallDto: UpdateCinemaHallDto) {
        return this.cinemaHallService.update(id, updateCinemaHallDto);
    }

  @Delete(':id')
    remove(
      @Param('id') id: string
    ) {
      return this.cinemaHallService.remove(id);
    }
}