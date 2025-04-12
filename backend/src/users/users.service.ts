import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users;
    }

    async getUserByLogin(login: string) {
        const user = await this.userRepository.findOne({ 
            where: { login }, 
            include: { all: true },
            attributes: { include: ['password'] }
        });
        return user;
    }

    async getUserByTable(tabel: string) {
        const user = await this.userRepository.findOne({ where: { tabel }, include: { all: true }  });
        return user;
    }

    async updateUser(id: number, dto: CreateUserDto) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        await user.update(dto);
        return user;
    }

    async deleteUser(id: number) {
        const user = await this.userRepository.findByPk(id);
        if (!user) {
            throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
        }
        await user.destroy();
        return { message: 'Пользователь успешно удален' };
    }
}
