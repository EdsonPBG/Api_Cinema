import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthDto } from '../auth/dto/auth.dto';
import { MoviePaginationDto } from './dto/pagination-movie.dto';

@UseGuards(AuthDto)
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  
  @Post()
    create(
      @Body() 
        createMovieDto: CreateMovieDto
      ) {
          return this.moviesService.createMovie(createMovieDto);
    }

  @Get()
    findAll(@Query() moviePaginationDto: MoviePaginationDto) {
       return this.moviesService.findAll(moviePaginationDto);
    }

  @Get(':id')
    findOne(
      @Param('id') id: string) {
        return this.moviesService.findOne(id);
      }

  @Patch(':id')
    update(
      @Param('id') id: string, 
      @Body() updateMovieDto: UpdateMovieDto) {
        return this.moviesService.update(id, updateMovieDto);
      }

  @Delete(':id')
    remove(
      @Param('id') id: string
    ) {
      return this.moviesService.remove(id);
    }
}
