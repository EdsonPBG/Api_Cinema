import { Module } from '@nestjs/common';
import { CinemaHallService } from './cinema-hall.service';
import { CinemaHallController } from './cinema-hall.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { CinemaHall } from './entities/cinema-hall.entity';

@Module({
  imports: [SequelizeModule.forFeature([CinemaHall])],
  controllers: [CinemaHallController],
  providers: [CinemaHallService],
})
export class CinemaHallModule {}