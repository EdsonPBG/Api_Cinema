import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './entities/users.entity';
import { CreateUsersDto } from './dto/create-users.dto';
import { hashSync as bcryptyHashSync } from 'bcrypt'; 
import { UserPaginationdDto } from './dto/pagination-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
    constructor (
        @InjectModel(Users)
        private readonly userModel: typeof Users
    ) {}

    async createUsers(user: CreateUsersDto) {
        await this.validateEmail(user.email);
        await this.validateUsername(user.username);

        const createdUser = await this.userModel.create({
            ...user,
            password: bcryptyHashSync(user.password, 10),
        });

        if (createdUser) {
            return { message: "Usuario adicionado com sucesso!!", status: HttpStatus.OK }
        };
    }

    async findAll(userPagination: UserPaginationdDto) {
        const offset = userPagination.offset ?? 0;
        const limit = userPagination.limit ?? 10;

        return await this.userModel.findAll({
            offset: offset,
            limit: limit,
        });
    };

    async updateUser(id: string, user: UpdateUserDto) {
        if (user.email) {
            await this.validateEmail(user.email);

            if (user.username) {
                await this.validateUsername(user.username);
            };
        };

        const updateUser = await this.userModel.update(
            { ...user },
            { where: { user_id: id }, returning: true },
        );
        return updateUser [1][0]
    };

    async removeUser(id: string) {
        const deleteUser = await this.userModel.destroy({
            where: { user_id: id },
        });

        if (deleteUser === 0) {
            throw new NotFoundException("Usuario não encontrado!");
        }
        return { message: "Usuario removido com sucesso!", status: HttpStatus.OK};
    };

    // --------------------------------------------------- VALIDATE USERS ------------------------------
    async validateEmail(email: string) {
        const emailAlreadyExists = await this.userModel.findOne({
            where: { email: email },
        });

        if (emailAlreadyExists) {
            throw new HttpException("Esse email esta em uso", HttpStatus.BAD_REQUEST);
        }
        return true;
    }

    async validateUsername (username: string) {
    const usernameAlreadyExists = await this.userModel.findOne({ 
      where: { username: username }, 
    });

    if (usernameAlreadyExists) {
      throw new HttpException("Este username já esta em uso", HttpStatus.BAD_REQUEST)
    }
    return true;
  }
}