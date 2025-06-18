# NestJS Skeleton

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
