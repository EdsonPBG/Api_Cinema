import { Module } from '@nestjs/common';
import { SeatsService } from './seats.service';
import { SeatsController } from './seats.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Seat } from './entities/seat.entity';
import { Reservation } from '../reservations/entities/reservation.entity';

@Module({
  imports: [SequelizeModule.forFeature([
    Seat
  ]),
],
  controllers: [SeatsController],
  providers: [SeatsService],
})
export class SeatsModule {}
