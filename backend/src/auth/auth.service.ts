import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService, 
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async login(userDto: CreateUserDto) {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(userDto: CreateUserDto) {
        const candidate = await this.userService.getUserByLogin(userDto.login);
        const tabel = await this.userService.getUserByTable(userDto.tabel);    
        if (candidate) {
            throw new HttpException('Пользователь с таким login уже существует', HttpStatus.BAD_REQUEST);
        }
        if (tabel) {
            throw new HttpException('Пользователь с таким табелем уже существует', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({...userDto, password: hashPassword});
        return this.generateToken(user);
    }

    async generateToken(user: User) {
        try {
            const payload = {login: user.login, id: user.id, tabel: user.tabel};
            const token = this.jwtService.sign(payload);
            return {token};
        } catch (error) {
            throw new HttpException('Ошибка при создании токена', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private async validateUser(userDto: CreateUserDto) {
        let user: User | null = null;
        
        if (userDto.login) {
            user = await this.userService.getUserByLogin(userDto.login);
        } else if (userDto.tabel) {
            user = await this.userService.getUserByTable(userDto.tabel);
        }
        
        if (!user) {
            throw new UnauthorizedException({message: 'Некорректные данные для входа'})
        }
        
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (passwordEquals) {
            return user;
        }
        throw new UnauthorizedException({message: 'Некорректный пароль'})
    }
}
