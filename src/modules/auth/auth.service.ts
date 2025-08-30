import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../users/entities/users.entity';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config()
@Injectable()
export class AuthService {
    private jwtExpirationTimeInSeconds: number;
        constructor (
            @InjectModel(Users)
            private readonly userModel: typeof Users,
            private readonly jwtService: JwtService,
        ) {
            this.jwtExpirationTimeInSeconds = Number(process.env.JWT_EXPIRATION_TIME)
        }

        async signIn(username: string, password: string) {
            const user = await this.userModel.findOne({
                where: { username: username },
            });

            if (!user || !bcryptCompareSync(password, user.dataValues.password)) {
                throw new BadRequestException("username ou password incorreto");
            }

            const payload = {
                user_id: user.user_id,
                email: user.email,
                username: user.username
            };

            const token = this.jwtService.sign(payload);

            return {
                token: token,
                user_id: user.user_id,
                expiresIn: this.jwtExpirationTimeInSeconds
            }
        }
}