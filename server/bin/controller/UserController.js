"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("@overnightjs/jwt");
const UserService_1 = __importDefault(require("../service/UserService"));
const core_1 = require("@overnightjs/core");
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const multerS3_1 = require("./multerS3");
let UserController = class UserController {
    constructor() {
        this.userService = UserService_1.default.getInstance();
    }
    async searchByUsername(req, res) {
        const { q } = req.query;
        const users = await this.userService.searchByUsername(q);
        if (Array.isArray(users)) {
            res.status(http_status_codes_1.OK).json(users);
        }
        else {
            throw new Error('Não foi possível retornar os usuários.');
        }
    }
    async getAll(req, res) {
        const users = await this.userService.getAll();
        if (Array.isArray(users)) {
            res.status(http_status_codes_1.OK).json(users);
        }
        else {
            throw new Error('Não foi possível retornar os usuários.');
        }
    }
    async userPosts(req, res) {
        const { userId } = req.params;
        const posts = await this.userService.getUserPosts(parseInt(userId));
        if (Array.isArray(posts)) {
            res.status(http_status_codes_1.OK).json(posts);
        }
        else {
            throw new Error('Não foi possível remover o usuário.');
        }
    }
    async logout(req, res) {
        const { tokenId } = req.payload;
        const removed = await this.userService.logout(tokenId);
        if (removed) {
            res.status(http_status_codes_1.OK).end();
        }
        else {
            throw new Error('Não foi possível fazer logout.');
        }
    }
    async create(req, res) {
        const { body } = req;
        if (req.file && req.file.location) {
            body.profilePhoto = req.file.location;
        }
        else {
            delete body.profilePhoto;
        }
        const user = await this.userService.add(body);
        const token = await this.userService.generateToken(user.id);
        if (user) {
            res.status(http_status_codes_1.CREATED).json({
                user,
                token
            });
        }
        else {
            throw new Error('Não foi possível criar o usuário.');
        }
    }
    async login(req, res) {
        const { username, password } = req.body;
        const userId = await this.userService.login(username, password);
        if (userId) {
            const token = await this.userService.generateToken(userId);
            res.status(http_status_codes_1.CREATED).json({
                userId,
                token
            });
        }
        else {
            throw new Error('Não foi possível fazer login.');
        }
    }
    async get(req, res) {
        const { userId } = req.params;
        const user = await this.userService.getById(parseInt(userId));
        if (user) {
            res.status(http_status_codes_1.OK).json(user);
        }
        else {
            throw new Error('Não foi possível atualizar os dados do usuário.');
        }
    }
    async update(req, res) {
        const { userId } = req.params;
        const { body } = req;
        if (req.file && req.file.location) {
            body.profilePhoto = req.file.location;
        }
        else {
            delete body.profilePhoto;
        }
        const updated = await this.userService.updateById(parseInt(userId), body);
        if (updated) {
            res.status(http_status_codes_1.OK).end();
        }
        else {
            throw new Error('Não foi possível atualizar os dados do usuário.');
        }
    }
    async destroy(req, res) {
        const { userId } = req.params;
        const removed = await this.userService.removeById(parseInt(userId));
        if (removed) {
            res.status(http_status_codes_1.OK).end();
        }
        else {
            throw new Error('Não foi possível remover o usuário.');
        }
    }
};
__decorate([
    core_1.Get('search')
], UserController.prototype, "searchByUsername", null);
__decorate([
    core_1.Get()
], UserController.prototype, "getAll", null);
__decorate([
    core_1.Get(':userId/posts')
], UserController.prototype, "userPosts", null);
__decorate([
    core_1.Delete('signout'),
    core_1.Middleware([
        jwt_1.JwtManager.middleware,
        authMiddleware_1.default
    ])
], UserController.prototype, "logout", null);
__decorate([
    core_1.Post('signup'),
    core_1.Middleware(multerS3_1.upload.single('profilePhoto'))
], UserController.prototype, "create", null);
__decorate([
    core_1.Post('signin')
], UserController.prototype, "login", null);
__decorate([
    core_1.Get(':userId')
], UserController.prototype, "get", null);
__decorate([
    core_1.Put(':userId'),
    core_1.Middleware([
        jwt_1.JwtManager.middleware,
        authMiddleware_1.default,
        multerS3_1.upload.single('profilePhoto')
    ])
], UserController.prototype, "update", null);
__decorate([
    core_1.Delete(':userId'),
    core_1.Middleware([
        jwt_1.JwtManager.middleware,
        authMiddleware_1.default
    ])
], UserController.prototype, "destroy", null);
UserController = __decorate([
    core_1.Controller('api/user'),
    core_1.ClassWrapper(express_async_handler_1.default)
], UserController);
exports.default = UserController;
//# sourceMappingURL=UserController.js.map