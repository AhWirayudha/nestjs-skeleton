import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Request } from 'express';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * Get the current user based on the JWT token.
   * @param req The request object containing the user information.
   * @returns The current user.
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: Request) {
    const user = this.usersService.findByUsernameOrEmail(
      req.body.username || req.body.email,
    );
    return user;
  }
  /**
   * Get all users. This endpoint is protected and requires admin role.
   * @returns An array of all users.
   */
  @Get()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getAll() {
    return this.usersService.findAll();
  }
}