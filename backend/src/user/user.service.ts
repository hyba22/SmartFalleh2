import { Injectable } from '@nestjs/common';
import User from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHasher } from '../common/password-hasher';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private passwordHasher: PasswordHasher
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async create(user: CreateUserDto): Promise<User> {
        // Hash the password before saving
        const hashedPassword = await this.passwordHasher.hash(user.password);
        const userWithHashedPassword = { ...user, password: hashedPassword };
        return this.userRepository.save(userWithHashedPassword);
    }

    async update(id: number, user: CreateUserDto): Promise<User | null> {
        const updatedUser = await this.userRepository.update(id, user);
        return this.userRepository.findOne({ where: { id } });
    }

    async delete(id: number): Promise<User | null> {
        const deletedUser = await this.userRepository.delete(id);
        return this.userRepository.findOne({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }
}
