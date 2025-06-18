import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findByUsernameOrEmail(identifier: string): Promise<User | undefined>;
    create(data: Partial<User>): Promise<User>;
    findAll(): Promise<User[]>;
}
