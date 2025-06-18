import { Repository } from 'typeorm';
import { Role } from './role.entity';
export declare class RolesService {
    private rolesRepository;
    constructor(rolesRepository: Repository<Role>);
    createIfNotExists(data: Partial<Role>): Promise<Role>;
    findAll(): Promise<Role[]>;
}
