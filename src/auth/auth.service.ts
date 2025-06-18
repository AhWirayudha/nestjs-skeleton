import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

/**
 * Service for authentication and JWT token management.
 */
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates a user by username/email and password.
   * @param identifier Username or email
   * @param pass Password
   * @returns User entity (without password)
   */
  async validateUser(identifier: string, pass: string): Promise<Omit<User, 'password_hash'> | null> {
    const user = await this.usersService.findByUsernameOrEmail(identifier);
    if (user && await bcrypt.compare(pass, user.password_hash)) {
      // Return user object without password_hash
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Generates a JWT access token for the user.
   * @param user User entity
   */
  async login(user: User) {
    const payload = { username: user.username, sub: user.id, roles: user.roles.map(r => r.name) };
    return { access_token: this.jwtService.sign(payload) };
  }
}