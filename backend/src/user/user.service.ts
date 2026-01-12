import { Injectable } from '@nestjs/common';
import User from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordHasher } from '../common/password-hasher';

@Injectable()
export class UserService {
    [x: string]: any;
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private passwordHasher: PasswordHasher
    ) {}

    async findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findByRole(role: 'admin' | 'agriculteur' | 'jury' | 'responsable'): Promise<User[]> {
    return this.userRepository.find({ where: { role } });
    }

    async findOne(id: number): Promise<User | null> {
        return this.userRepository.findOne({ where: { id } });
    }

    async create(user: CreateUserDto): Promise<User> {
        // Check if password is already hashed (starts with $2a$, $2b$, or $2y$)
        const isAlreadyHashed = user.password && 
            (user.password.startsWith('$2a$') || 
             user.password.startsWith('$2b$') || 
             user.password.startsWith('$2y$'));
        
        // Only hash if not already hashed
        const passwordToSave = isAlreadyHashed 
            ? user.password 
            : await this.passwordHasher.hash(user.password);
            
        const userWithHashedPassword = { ...user, password: passwordToSave };
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
