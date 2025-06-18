import { Role } from '../roles/role.entity';
export declare class User {
    id: string;
    username: string;
    email: string;
    password_hash: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
    roles: Role[];
}
