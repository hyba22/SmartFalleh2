import * as bcrypt from 'bcrypt';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PasswordHasher {
    private readonly logger = new Logger(PasswordHasher.name);
    private readonly saltRounds = 10;

    async hash(password: string): Promise<string> {
        if (!password) {
            this.logger.error('Cannot hash empty password');
            throw new Error('Password cannot be empty');
        }
        try {
            const hash = await bcrypt.hash(password, this.saltRounds);
            return hash;
        } catch (error) {
            this.logger.error(`Error hashing password: ${error.message}`, error.stack);
            throw new Error('Failed to hash password');
        }
    }

    async compare(password: string, hash: string): Promise<boolean> {
        this.logger.debug(`[PasswordHasher] Starting password comparison`);
        
        if (!password || !hash) {
            this.logger.warn('Password or hash is empty');
            this.logger.debug(`Password empty: ${!password}, Hash empty: ${!hash}`);
            return false;
        }
        
        try {
            // Check if the hash is a valid bcrypt hash
            const isBcryptHash = hash.startsWith('$2a$') || hash.startsWith('$2b$') || hash.startsWith('$2y$');
            
            if (!isBcryptHash) {
                this.logger.error('Invalid hash format - not a bcrypt hash');
                this.logger.debug(`Hash format: ${hash.substring(0, 10)}...`);
                return false;
            }

            this.logger.debug(`[PasswordHasher] Calling bcrypt.compare`);
            const isMatch = await bcrypt.compare(password, hash);
            
            this.logger.debug(`[PasswordHasher] bcrypt.compare result: ${isMatch}`);
            
            if (!isMatch) {
                this.logger.warn('Password does not match hash');
                // For debugging - don't log actual password in production
                this.logger.debug(`Password length: ${password.length}, Hash length: ${hash.length}`);
                this.logger.debug(`Hash prefix: ${hash.substring(0, 10)}...`);
            } else {
                this.logger.debug('Password matches hash successfully');
            }
            
            return isMatch;
        } catch (error) {
            this.logger.error(`Error comparing password: ${error.message}`, error.stack);
            return false;
        }
    }
}
