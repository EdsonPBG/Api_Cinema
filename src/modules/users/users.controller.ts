import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UserPaginationdDto } from './dto/pagination-users.dto';
import { UpdateUserDto } from './dto/update-users.dto';
import { AuthDto } from '../auth/dto/auth.dto';

@Controller('users')
export class UsersController {
    constructor (
        private readonly UserService: UsersService
    ) {}

    @Post()
    async createUsers (
        @Body()
            users: CreateUsersDto
    ) {
        return await this.UserService.createUsers(users);
    }

    @UseGuards(AuthDto)
    @Get()
    async findAll(
        @Query() userPagination: UserPaginationdDto 
    ) {
        return await this.UserService.findAll(userPagination);
    }

    @UseGuards(AuthDto)
    @Patch(':id')
    async updateUsers(
        @Param('id') id: string,
        @Body() updateUser: UpdateUserDto
    ) {
        return await this.UserService.updateUser(id, updateUser);
    }

    @UseGuards(AuthDto)
    @Delete(':id')
    async removeUsers(
        @Param('id') id: string
    ) {
        return await this.UserService.removeUser(id);
    }
}