import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Reservation } from './entities/reservation.entity';
import { Seat } from '../seats/entities/seat.entity';
import { Users } from '../users/entities/users.entity';
import { Session } from 'inspector/promises';
import { MovieSession } from '../session/entities/session.entity';

@Module({
  imports: [SequelizeModule.forFeature([
    Reservation,
    Seat,
    Users,
    MovieSession
  ]),
],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
