import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    validateUser(identifier: string, pass: string): Promise<Omit<User, 'password_hash'> | null>;
    login(user: User): Promise<{
        access_token: string;
    }>;
}
