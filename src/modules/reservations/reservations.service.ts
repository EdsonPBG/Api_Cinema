// src/reservations/reservations.service.ts
import { Injectable, BadRequestException, NotFoundException, HttpStatus } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { Seat } from '../seats/entities/seat.entity';
import { Sequelize } from 'sequelize-typescript';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation)
    private readonly reservaModel: typeof Reservation,
    @InjectModel(Seat)
    private readonly seatModel: typeof Seat,
    private sequelize: Sequelize,
  ) { }

  async create(createReservationDto: CreateReservationDto) {
    return this.sequelize.transaction(async (t) => {
      const { user_id, session_id, seat_ids } = createReservationDto;

      const seats = await this.seatModel.findAll({
        where: {
          seat_id: seat_ids,
          session_id: session_id,
          status: 'Agendado',
        },
        transaction: t,
      });

      if (seats.length !== seat_ids.length) {
        throw new BadRequestException('Um ou mais assentos já estão reservados ou não existem.');
      }

      const totalPrice = seats.length * 25.00;

      const newReservation = await this.reservaModel.create(
        {
          user_id,
          session_id,
          total_price: totalPrice,
        },
        { transaction: t },
      );

      await this.seatModel.update(
        {
          status: 'Agendado',
          reservation_id: newReservation.reservation_id,
        },
        {
          where: { seat_id: seat_ids },
          transaction: t,
        },
      );

      return newReservation;
    });
  }

  async findAll() {
    return await this.reservaModel.findAll();
  }

  async findOne(id: string) {
    const findReserva = await this.reservaModel.findOne({
      where: { reservation_id: id },
    });

    if (!findReserva) {
      throw new NotFoundException("Não encontrado")
    }
    return findReserva;
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    const [numberOfAffectedRows, [updatedSession]] = await this.reservaModel.update(
      { ...updateReservationDto },
      { where: { session_id: id }, returning: true },
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("Reserva não encontrada")
    }
    return updatedSession
  }

  async remove(id: string) {
    const removedReserva = await this.reservaModel.destroy({
      where: { session_id: id },
    });

    if (!removedReserva) {
      throw new NotFoundException("Reserva não encontrada")
    }
    return { message: "Removida removida com sucesso", status: HttpStatus.OK };
  }
}