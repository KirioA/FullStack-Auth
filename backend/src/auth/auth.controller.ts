import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('/login')
    @ApiOperation({ summary: 'Вход пользователя в систему' })
    @ApiResponse({ status: 200, type: AuthResponseDto, description: 'Возвращает JWT токен' })
    @ApiResponse({ status: 401, description: 'Неверный логин или пароль' })
    login(@Body() userDto: CreateUserDto) {
        return this.authService.login(userDto);
    }

    @Post('/registration')
    @ApiOperation({ summary: 'Регистрация нового пользователя' })
    @ApiResponse({ status: 201, type: AuthResponseDto, description: 'Пользователь успешно зарегистрирован' })
    @ApiResponse({ status: 400, description: 'Пользователь с таким логином или табельным номером уже существует' })
    registration(@Body() userDto: CreateUserDto) {
        return this.authService.registration(userDto);
    }   
}
