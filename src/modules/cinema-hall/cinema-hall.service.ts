import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCinemaHallDto } from './dto/create-cinema-hall.dto';
import { UpdateCinemaHallDto } from './dto/update-cinema-hall.dto';
import { InjectModel } from '@nestjs/sequelize';
import { CinemaHall } from './entities/cinema-hall.entity';
import { CinemaHallPaginationDto } from './dto/pagination-cinema-hall.dto';

@Injectable()
export class CinemaHallService {
  constructor(
    @InjectModel(CinemaHall)
    private readonly cinemaHallModel: typeof CinemaHall
  ) { }

  async create(createCinemaHallDto: CreateCinemaHallDto) {
    const createdCinemaHall = await this.cinemaHallModel.create({ ...createCinemaHallDto })

    if (createdCinemaHall) {
      return { message: "Sala criada com sucesso!", status: HttpStatus.OK };
    }
  }

 async findAll(cinemaHallPagination: CinemaHallPaginationDto) {
   const limit = cinemaHallPagination.limit ?? 10;
   const offset = cinemaHallPagination.offset ?? 0;
 
   const { count, rows } = await this.cinemaHallModel.findAndCountAll({
     offset: offset,
     limit: limit,
   });
 
   if (count === 0) {
     throw new NotFoundException('Não existe nenhuma sessão.');
   }
     return { total: count, sessions: rows };
 }

  async findOne(id: string) {
    const findCinemaHall = await this.cinemaHallModel.findOne({
      where: { cinemaHall_id: id },
    });

    if (!findCinemaHall) {
      throw new NotFoundException("Sala não encontrada!");
    }
    return findCinemaHall;
  }

  async update(id: string, updateCinemaHallDto: UpdateCinemaHallDto) {
    const [numberOfAffectedRows, [updatedCinemaHall]] = await this.cinemaHallModel.update(
      { ...updateCinemaHallDto },
      { where: { cinemaHall_id: id }, returning: true },
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("Sala Não encontrada!")
    }
    return updatedCinemaHall;
  }

  async remove(id: string) {
    const removedCinemaHall = await this.cinemaHallModel.destroy({
      where: { cinemaHall_id: id },
    });

    if (!removedCinemaHall) {
      throw new NotFoundException("Sala não encontrado!")
    }
    return { message: "Sala removida com sucesso!", status: HttpStatus.OK };
  }
}