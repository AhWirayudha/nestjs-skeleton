import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './role.entity';

/**
 * Service for role operations.
 */
@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async createIfNotExists(data: Partial<Role>): Promise<Role> {
    let role = await this.rolesRepository.findOne({ where: { name: data.name } });
    if (!role) {
      role = this.rolesRepository.create(data);
      await this.rolesRepository.save(role);
    }
    return role;
  }

  async findAll(): Promise<Role[]> {
    return this.rolesRepository.find();
  }
}