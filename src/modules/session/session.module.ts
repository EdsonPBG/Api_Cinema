import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { MovieSession } from './entities/session.entity';

@Module({
  imports: [SequelizeModule.forFeature([MovieSession])],
  controllers: [SessionController],
  providers: [SessionService],
})
export class SessionModule {}
