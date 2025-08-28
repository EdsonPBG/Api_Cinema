import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto/auth.dto";

@Controller('auth')
export class AuthController {
    constructor (private readonly authService: AuthService) {}

    @Post('login')
    async signIn(
        @Body() data: AuthDto
    ) {
        return await this.authService.signIn(data.username, data.password);
    };
}
