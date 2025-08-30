import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Movie } from './entities/movie.entity';
import { MoviePaginationDto } from './dto/pagination-movie.dto';

@Injectable()
export class MoviesService {
  constructor (
    @InjectModel(Movie)
    private readonly movieModel: typeof Movie
  ) {}

    async createMovie(createMovieDto: CreateMovieDto) {
        const createdMovie = await this.movieModel.create({...createMovieDto})

          if(createdMovie) {
            return { message: "Filme adicionado com sucesso!", status: HttpStatus.OK };
          }
    }

    async findAll(moviePaginationDto: MoviePaginationDto) {
      const offset = moviePaginationDto.offset ?? 0;
      const limit = moviePaginationDto.limit ?? 10;

      return await this.movieModel.findAll({
        offset: offset,
        limit: limit,
      });
  }

    async findOne(id: string) {
      const findMovie = await this.movieModel.findOne({
        where: { movie_id: id },
      });

      if (!findMovie) {
        console.log("Movie not found!");
      } 
        return findMovie;
    }

    async update(id: string, updateMovieDto: UpdateMovieDto) { 
      const [numberOfAffectedRows,[updatedMovie]] = await this.movieModel.update(
        { ...updateMovieDto },
        { where: { movie_id: id}, returning: true },
      );
      
      if (numberOfAffectedRows === 0) {
        throw new NotFoundException("Movie not found!");
      } 
        return updatedMovie;
    }

    async remove(id: string) {
      const removedMovie = await this.movieModel.destroy({
        where: { movie_id: id },
      });

      if (!removedMovie) {
        throw new NotFoundException("Movie not found!")
      } 
        return { message: "Removido com sucesso!", status: HttpStatus.OK }
    };
}