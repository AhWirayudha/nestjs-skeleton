import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { UsersService } from '../users/users.service';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcrypt';

/**
 * Seeds the database with initial roles and an admin user.
 */
async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const rolesService = app.get(RolesService);
  const usersService = app.get(UsersService);

  // Create base roles
  const adminRole = await rolesService.createIfNotExists({ name: 'admin', description: 'Administrator' });
  const userRole = await rolesService.createIfNotExists({ name: 'user', description: 'Regular User' });

  // Create admin user if not exists
  const adminEmail = 'admin@example.com';
  const adminUser = await usersService.findByUsernameOrEmail(adminEmail);
  if (!adminUser) {
    const password = await bcrypt.hash('admin123', 10);
    await usersService.create({
      username: 'admin',
      email: adminEmail,
      password_hash: password,
      roles: [adminRole],
    });
    console.log('Admin user created:', adminEmail, 'password: admin123');
  } else {
    console.log('Admin user already exists');
  }

  await app.close();
}
bootstrap();