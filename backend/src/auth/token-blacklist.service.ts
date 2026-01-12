// src/auth/token-blacklist.service.ts
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class TokenBlacklistService {
  private readonly blacklist = new Set<string>();
  private readonly logger = new Logger(TokenBlacklistService.name);

  /**
   * Add a token to the blacklist
   */
  add(token: string) {
    this.blacklist.add(token);
    this.logger.log(`Token blacklisted: ${token.substring(0, 10)}...`);
  }

  /**
   * Check if a token is blacklisted
   */
  has(token: string): boolean {
    return this.blacklist.has(token);
  }

  /**
   * Optional: remove token from blacklist (not usually needed)
   */
  remove(token: string) {
    if (this.blacklist.delete(token)) {
      this.logger.log(`Token removed from blacklist: ${token.substring(0, 10)}...`);
    }
  }

  /**
   * Optional: clear all blacklist (for testing)
   */
  clear() {
    this.blacklist.clear();
    this.logger.log('Token blacklist cleared');
  }
}
