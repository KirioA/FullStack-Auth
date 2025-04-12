import { Controller, Post, Body, Get, UsePipes, ValidationPipe, Put, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiOperation, ApiResponse  } from '@nestjs/swagger';
import { User } from './users.model';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({ status: 200, type: User })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto);
    }
    
    
    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, type: [User] })
    @UseGuards(JwtAuthGuard)
    getAll() {
        return this.usersService.getAllUsers();
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiResponse({ status: 200, type: User })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard)
    update(@Param('id', ParseIntPipe) id: number, @Body() userDto: CreateUserDto) {
        return this.usersService.updateUser(id, userDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'Not Found' })
    @UseGuards(JwtAuthGuard)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.deleteUser(id);
    }
}
