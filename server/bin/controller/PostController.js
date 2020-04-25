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
const jwt_1 = require("@overnightjs/jwt");
const http_status_codes_1 = require("http-status-codes");
const core_1 = require("@overnightjs/core");
const PostService_1 = __importDefault(require("../service/PostService"));
const authMiddleware_1 = __importDefault(require("./middlewares/authMiddleware"));
const postAuthorityMiddleware_1 = __importDefault(require("./middlewares/postAuthorityMiddleware"));
const multerGCS_1 = require("./multerGCS");
let PostController = class PostController {
    constructor() {
        this.postService = PostService_1.default.getInstance();
    }
    async add(req, res) {
        const { userId } = req.payload;
        const { body } = req;
        if (req.file && req.file.location) {
            body.s3Address = req.file.location;
        }
        else {
            delete body.s3Address;
        }
        const post = await this.postService.add(body, userId);
        if (post) {
            res.status(http_status_codes_1.CREATED).json(post);
        }
        else {
            throw new Error('Não foi possível criar o post.');
        }
    }
    async update(req, res) {
        const { postId } = req.params;
        const { body } = req;
        if (req.file && req.file.location) {
            body.s3Address = req.file.location;
        }
        else {
            delete body.s3Address;
        }
        const updated = await this.postService.updateById(parseInt(postId), body);
        if (updated) {
            res.status(http_status_codes_1.OK).end();
        }
        else {
            throw new Error('Nenhum post foi atualizado.');
        }
    }
    async remove(req, res) {
        const { postId } = req.params;
        const removed = await this.postService.updateById(parseInt(postId), req.body);
        if (removed) {
            res.status(http_status_codes_1.OK).end();
        }
        else {
            throw new Error('Nenhum post foi removido.');
        }
    }
    async get(req, res) {
        const { postId } = req.params;
        const post = await this.postService.getById(parseInt(postId));
        if (post) {
            res.status(http_status_codes_1.OK).json(post);
        }
        else {
            res.status(http_status_codes_1.NOT_FOUND).end();
        }
    }
    async getlikes(req, res) {
        const { postId } = req.params;
        const likes = await this.postService.getLikesById(parseInt(postId));
        if (Array.isArray(likes)) {
            res.status(http_status_codes_1.OK).json(likes);
        }
        else {
            throw new Error('Não foi possível capturar os likes do post.');
        }
    }
    async like(req, res) {
        const { postId } = req.params;
        const { userId } = req.payload;
        console.log(req.body);
        if (req.body.like) {
            const like = await this.postService.likeById(parseInt(postId), parseInt(userId));
            if (like) {
                res.status(http_status_codes_1.CREATED).json(like);
            }
            else {
                throw new Error('Não foi possível gerar o like no post.');
            }
        }
        else {
            const unlike = await this.postService.unlikeById(parseInt(postId), parseInt(userId));
            if (unlike) {
                res.status(http_status_codes_1.OK).end();
            }
            else {
                throw new Error('Não foi possível completar a operação.');
            }
        }
    }
};
__decorate([
    core_1.Post(':userId/posts'),
    core_1.Middleware([
        jwt_1.JwtManager.middleware,
        authMiddleware_1.default,
        multerGCS_1.upload.single('s3Address')
    ])
], PostController.prototype, "add", null);
__decorate([
    core_1.Put(':userId/posts/:postId'),
    core_1.Middleware([
        jwt_1.JwtManager.middleware,
        authMiddleware_1.default,
        postAuthorityMiddleware_1.default,
        multerGCS_1.upload.single('s3Address')
    ])
], PostController.prototype, "update", null);
__decorate([
    core_1.Delete(':userId/posts/:postId'),
    core_1.Middleware([
        jwt_1.JwtManager.middleware,
        authMiddleware_1.default,
        postAuthorityMiddleware_1.default
    ])
], PostController.prototype, "remove", null);
__decorate([
    core_1.Get(':userId/posts/:postId')
], PostController.prototype, "get", null);
__decorate([
    core_1.Get(':userId/posts/:postId/likes')
], PostController.prototype, "getlikes", null);
__decorate([
    core_1.Post('posts/:postId/likes'),
    core_1.Middleware([
        jwt_1.JwtManager.middleware,
        authMiddleware_1.default
    ])
], PostController.prototype, "like", null);
PostController = __decorate([
    core_1.Controller('api'),
    core_1.ClassWrapper(express_async_handler_1.default)
], PostController);
exports.default = PostController;
//# sourceMappingURL=PostController.js.map