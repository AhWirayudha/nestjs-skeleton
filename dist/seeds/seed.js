"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../app.module");
const users_service_1 = require("../users/users.service");
const roles_service_1 = require("../roles/roles.service");
const bcrypt = __importStar(require("bcrypt"));
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const rolesService = app.get(roles_service_1.RolesService);
    const usersService = app.get(users_service_1.UsersService);
    const adminRole = await rolesService.createIfNotExists({ name: 'admin', description: 'Administrator' });
    const userRole = await rolesService.createIfNotExists({ name: 'user', description: 'Regular User' });
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
    }
    else {
        console.log('Admin user already exists');
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=seed.js.map