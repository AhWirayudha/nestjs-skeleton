import { User } from '../users/user.entity';
export declare class Role {
    id: string;
    name: string;
    description: string;
    users: User[];
}
