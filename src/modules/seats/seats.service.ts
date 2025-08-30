import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Seat } from './entities/seat.entity';
import { SeatPaginationDto } from './dto/pagination-seat.dto';

@Injectable()
export class SeatsService {
  constructor(
    @InjectModel(Seat)
    private readonly seatModel: typeof Seat
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    const createdSeat = await this.seatModel.create({ 
      ...createSeatDto, 
    });

    if (!createdSeat) {
      throw new NotFoundException("Assentos não existe")
    }
      return { message: "Assento adicionado com sucesso!", status: HttpStatus.OK };
  }

  async findAll(seatPaginationDto: SeatPaginationDto) {
    const offset = seatPaginationDto.offset ?? 0;
    const limit = seatPaginationDto.limit ?? 10;

    return await this.seatModel.findAll({
      offset: offset,
      limit: limit,
    });
  }

  async findOne(id: string) {
    const findSeatId = await this.seatModel.findOne({
      where: { seat_id: id },
    });
    
    if (!findSeatId) {
      throw new NotFoundException("Assentos não encontrado")
    }
      return findSeatId;
  }

  async update(id: string, updateSeatDto: UpdateSeatDto) {
    const updatedSeat = await this.seatModel.update(
     { ...updateSeatDto },
     { where: { seat_id: id }, returning: true }, 
    );

    if (!updatedSeat) {
      throw new NotFoundException("Assento não encontrado")
    }
      return updatedSeat;
  }

  async remove(id: string) {
    const removedSeat = await this.seatModel.destroy({
      where: { seat_id: id },
    });

    if (removedSeat) {
      return { message: "Assento remvoido com sucesso", status: HttpStatus.OK };
    }
  }
}
