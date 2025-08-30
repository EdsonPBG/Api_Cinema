import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectModel } from '@nestjs/sequelize';
import { MovieSession } from './entities/session.entity';

@Injectable()
export class SessionService {
  constructor (
    @InjectModel(MovieSession)
      private readonly movieSessionModel: typeof MovieSession
  ) {}

  async create(createMovieSessionDto: CreateMovieSessionDto) {
    const createdSession = await this.movieSessionModel.create({
      ...createMovieSessionDto
    });

    if (createdSession) {
      return { message: "Sessão criada com sucesso!", status: HttpStatus.OK }
    };
  }

  async findAll() {
    const allSession = await this.movieSessionModel.findAll()
      if (allSession.length === 0) {
        throw new NotFoundException("Não existe nenhuma sessão")
      }
        return allSession;
  }

  async findOne(id: string) {
    const findSession = await this.movieSessionModel.findOne({
       where: { session_id: id },
    });

    if (!findSession) {
      throw new NotFoundException("Sessão não encontrada")
    } 
      return findSession;
  }

  async update(id: string, updateSessionDto: UpdateSessionDto) {
    const [numberOfAffectedRows, [updatedSession]] = await this.movieSessionModel.update(
      { ...updateSessionDto },
      { where: { session_id: id }, returning: true},
    );

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException("Sessão não encontrada")
    }
      return updatedSession
  }

  async remove(id: string) {
    const removedSession = await this.movieSessionModel.destroy({
      where: { session_id: id },
    });

    if (!removedSession) {
      throw new NotFoundException("Sessão não encontrada")
    }
      return { message: "Sessão removida com sucesso", status: HttpStatus.OK };
  }
}
