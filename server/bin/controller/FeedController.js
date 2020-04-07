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
const core_1 = require("@overnightjs/core");
const http_status_codes_1 = require("http-status-codes");
const PostService_1 = __importDefault(require("../service/PostService"));
let FeedController = class FeedController {
    constructor() {
        this.postService = PostService_1.default.getInstance();
    }
    async get(req, res) {
        let posts;
        const { startDate, endDate } = req.query;
        if (startDate && endDate) {
            posts = await this.postService.getBetweenDates(startDate, endDate);
        }
        else {
            posts = await this.postService.getAll();
        }
        if (Array.isArray(posts)) {
            res.status(http_status_codes_1.OK).json(posts);
        }
        else {
            throw new Error('Não foi possível remover o usuário.');
        }
    }
};
__decorate([
    core_1.Get()
], FeedController.prototype, "get", null);
FeedController = __decorate([
    core_1.Controller('api/feed'),
    core_1.ClassWrapper(express_async_handler_1.default)
], FeedController);
exports.default = FeedController;
//# sourceMappingURL=FeedController.js.map