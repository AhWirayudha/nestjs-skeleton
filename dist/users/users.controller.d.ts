import { UsersService } from './users.service';
import { Request } from 'express';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getMe(req: Request): Promise<import("./user.entity").User | undefined>;
    getAll(): Promise<import("./user.entity").User[]>;
}
