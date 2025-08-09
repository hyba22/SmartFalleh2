import { Controller, Get, Param, Put, Delete, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from './user.service';
import User from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Body, Post } from '@nestjs/common';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return all users.', type: [User] })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Return the user.', type: User })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    findOne(@Param('id') id: number): Promise<User | null> {
        return this.userService.findOne(id);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.', type: User })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    create(@Body() user: CreateUserDto): Promise<User> {
        return this.userService.create(user);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully updated.', type: User })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    update(@Param('id') id: number, @Body() user: CreateUserDto): Promise<User | null> {
        return this.userService.update(id, user);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: HttpStatus.OK, description: 'The user has been successfully deleted.', type: User })
    @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'User not found.' })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Unauthorized.' })
    delete(@Param('id') id: number): Promise<User | null> {
        return this.userService.delete(id);
    }
}
