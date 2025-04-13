import { Controller, Post, Body, Get, UsePipes, ValidationPipe, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { User } from './users.model';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, type: User })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @UsePipes(ValidationPipe)
    @Auth()
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }
    
    
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @Auth()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, type: User })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @UsePipes(ValidationPipe)
    @Auth()
    update(@Param('id', ParseIntPipe) id: number, @Body() userDto: CreateUserDto) {
        return this.usersService.updateUser(id, userDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @Auth()
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}
