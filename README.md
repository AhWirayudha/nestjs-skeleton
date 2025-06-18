# NestJS Skeleton (Test Github Copilot)

A scalable and modular NestJS starter with:
- JWT authentication
- Role-Based Access Control (RBAC)
- PostgreSQL via TypeORM (with migrations & seeding)
- Swagger API Docs
- JSDoc-style comments & example unit tests
- Docker & GitHub Actions CI

---

## Features

- Modular structure (feature-first)
- JWT authentication
- RBAC guard and custom decorator
- PostgreSQL & TypeORM (migrations, seed)
- Swagger API documentation (`/api`)
- Example unit tests
- Docker + docker-compose
- GitHub Actions CI

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Docker (for easiest setup) or PostgreSQL locally

### Quick Setup (with Docker)

#### 1. Clone & Install

```bash
git clone https://github.com/AhWirayudha/nestjs-skeleton.git
cd nestjs-skeleton
cp .env.example .env
```

#### 2. Start Services

```bash
docker-compose up --build
```

#### 3. Run DB Migrations & Seed (in another terminal)

```bash
docker-compose exec app npm run build
docker-compose exec app npm run typeorm migration:run
docker-compose exec app npm run seed
```

#### 4. Explore API Docs

Go to [http://localhost:3000/api](http://localhost:3000/api)

---

## Sample User

- **Admin email:** `admin@example.com`
- **Password:** `admin123`

---

## Example Usage

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"identifier":"admin@example.com","password":"admin123"}'
```

This returns `{ "access_token": "<JWT here>" }`

### Get Current User

```bash
curl -H "Authorization: Bearer <JWT here>" http://localhost:3000/users/me
```

### Get All Users (admin only)

```bash
curl -H "Authorization: Bearer <JWT here>" http://localhost:3000/users
```

---

## Testing

```bash
npm run test
```

---

## CI/CD

- See `.github/workflows/ci.yml` for GitHub Actions config.

---

## License

MIT

---

## How to Add More Modules

Follow these steps to add a new module to the project:

1. **Generate a New Module**
   - Use the NestJS CLI to generate a new module, controller, and service:
     ```bash
     nest g module <module-name>
     nest g controller <module-name>
     nest g service <module-name>
     ```
   - This will create the necessary files in the `src/<module-name>/` directory.

2. **Implement Your Module Logic**
   - Add your business logic to the service and controller files generated in `src/<module-name>/`.

3. **Register the Module**
   - Import your new module in `app.module.ts`:
     ```typescript
     import { <ModuleName>Module } from './<module-name>/<module-name>.module';
     
     @Module({
       imports: [
         // ...existing modules
         <ModuleName>Module,
       ],
     })
     export class AppModule {}
     ```

4. **(Optional) Add Entity and DTOs**
   - If your module needs a database entity, create an entity file in `src/<module-name>/` and update the module to import `TypeOrmModule.forFeature([YourEntity])`.
   - Add DTOs in a `dto/` folder inside your module for request validation.

5. **Test the Module**
   - Write unit tests in the `src/<module-name>/` directory.
   - Run tests with:
     ```bash
     npm run test
     ```

6. **Document the Module**
   - Add Swagger decorators to your controller methods for API documentation.
   - Update this `README.md` or other docs as needed.

---

## Sample Features

### CRUD Endpoint with Paging

```typescript
// users.controller.ts
@Get()
async findAll(
  @Query('page') page = 1,
  @Query('limit') limit = 10,
): Promise<Pagination<UserEntity>> {
  return this.usersService.paginate({ page, limit });
}

// users.service.ts
async paginate(options: { page: number; limit: number }) {
  const [items, total] = await this.userRepository.findAndCount({
    skip: (options.page - 1) * options.limit,
    take: options.limit,
  });
  return {
    items,
    total,
    page: options.page,
    limit: options.limit,
  };
}
```

### Forgot Password with Email Verification

1. **User requests password reset:**  `POST /auth/forgot-password` with email.
2. **Send email with token:**  Generate a token, save it, and send a reset link via email.
3. **User clicks link and sets new password:**  `POST /auth/reset-password` with token and new password.

```typescript
// auth.controller.ts
@Post('forgot-password')
async forgotPassword(@Body('email') email: string) {
  await this.authService.sendPasswordResetEmail(email);
  return { message: 'Reset link sent if email exists.' };
}

@Post('reset-password')
async resetPassword(@Body() dto: { token: string; newPassword: string }) {
  await this.authService.resetPassword(dto.token, dto.newPassword);
  return { message: 'Password updated.' };
}
```

### Export Data to Excel

You can use the `exceljs` package to export data as Excel files.

1. **Install exceljs:**
   ```bash
   npm install exceljs
   ```
2. **Sample Controller Endpoint:**
   ```typescript
   // users.controller.ts
   import { Response } from 'express';
   import * as ExcelJS from 'exceljs';
   import { Res, Get, Controller } from '@nestjs/common';

   @Get('export')
   async exportUsers(@Res() res: Response) {
     const workbook = new ExcelJS.Workbook();
     const worksheet = workbook.addWorksheet('Users');
     worksheet.columns = [
       { header: 'ID', key: 'id', width: 10 },
       { header: 'Email', key: 'email', width: 30 },
       { header: 'Role', key: 'role', width: 15 },
     ];
     worksheet.addRows([
       { id: 1, email: 'admin@example.com', role: 'admin' },
       // ...more rows
     ]);
     res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
     res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');
     await workbook.xlsx.write(res);
     res.end();
   }
   ```

---

## Folder Structure

```
nestjs-skeleton/
├── docker-compose.yml
├── Dockerfile
├── ormconfig.json
├── package.json
├── README.md
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt.strategy.ts
│   │   ├── roles.decorator.ts
│   │   └── roles.guard.ts
│   ├── common/
│   │   └── guards/
│   ├── migration/
│   │   └── 1710000000000-InitUserAndRoleTables.ts
│   ├── migrations/
│   │   └── 1710000000000-InitUserAndRoleTables.ts
│   ├── roles/
│   │   ├── role.entity.ts
│   │   ├── roles.enum.ts
│   │   ├── roles.module.ts
│   │   └── roles.service.ts
│   ├── seeds/
│   │   └── seed.ts
│   └── users/
│       ├── user.entity.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       └── users.service.ts
└── test/
    ├── auth/
    │   └── auth.service.spec.ts
    └── users/
        └── users.service.spec.ts
```
