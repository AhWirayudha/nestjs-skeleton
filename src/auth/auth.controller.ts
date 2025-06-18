import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';

/**
 * Controller for authentication endpoints.
 */
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Login and get JWT token' })
  @ApiBody({ schema: {
    type: 'object',
    properties: {
      identifier: { type: 'string', example: 'admin@example.com' },
      password: { type: 'string', example: 'admin123' },
    },
  }})
  @Post('login')
  async login(@Body() body: { identifier: string, password: string }) {
    const user = await this.authService.validateUser(body.identifier, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user as any);
  }
}