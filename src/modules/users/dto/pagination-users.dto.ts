import { IsNumberString, IsOptional } from "class-validator";

export class UserPaginationdDto {
    @IsNumberString()
    @IsOptional()
    offset: number;

    @IsNumberString()
    @IsOptional()
    limit: number;
}