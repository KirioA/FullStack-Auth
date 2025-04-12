import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length } from "class-validator";


export class CreateUserDto {

    @ApiProperty({ example: 'user123', description: 'Login' })
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly login: string;

    @ApiProperty({ example: '123456789', description: 'Password' })
    @IsString({message: 'Должно быть строкой'})
    @Length(4, 16, {message: 'Не меньше 4 и не больше 16 символов'})
    readonly password: string;

    @ApiProperty({ example: '1234560', description: 'Tabel' })
    readonly tabel: string;
}