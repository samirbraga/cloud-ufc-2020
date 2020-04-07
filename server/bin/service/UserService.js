"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = require("@overnightjs/jwt");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const url_1 = __importDefault(require("url"));
const User_1 = __importDefault(require("../repository/User"));
const TokenBlackList_1 = __importDefault(require("../repository/TokenBlackList"));
exports.s3 = new aws_sdk_1.default.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
});
class UserService {
    constructor() {
        this.userRepository = new User_1.default();
        this.tokenRepository = new TokenBlackList_1.default();
    }
    static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }
        return UserService.instance;
    }
    async getById(id) {
        return this.userRepository.getById(id);
    }
    async checkToken(tokenId, userId) {
        const token = await this.tokenRepository.getById(tokenId);
        if (token && token.userId === userId) {
            return true;
        }
        else {
            return false;
        }
    }
    async getUserPosts(userId) {
        return this.userRepository.getUserPosts(userId);
    }
    async generateToken(userId) {
        const tokenId = this.tokenRepository.generateId();
        const token = jwt_1.JwtManager.jwt({
            userId,
            tokenId
        });
        return await this.tokenRepository.insert({
            id: tokenId,
            token,
            userId
        });
    }
    async add(newUser) {
        return this.userRepository.insert(newUser);
    }
    async login(username, password) {
        const user = await this.userRepository.getByUserName(username);
        if (user && user.password === password) {
            return user.id;
        }
        else {
            return undefined;
        }
    }
    deleteImage(imageUrl) {
        return new Promise((resolve, reject) => {
            exports.s3.deleteObject({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: url_1.default.parse(imageUrl).path
            }).send(err => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
    async updateById(id, newUser) {
        const oldUser = await this.userRepository.getById(id);
        if (newUser.profilePhoto) {
            await this.deleteImage(oldUser.profilePhoto);
        }
        const [updated] = await this.userRepository.updateById(id, newUser);
        return updated > 0;
    }
    async removeById(id) {
        const oldUser = await this.userRepository.getById(id);
        await this.deleteImage(oldUser.profilePhoto);
        const removed = await this.userRepository.destroyById(id);
        return removed > 0;
    }
    async logout(tokenId) {
        const removed = await this.tokenRepository.destroyById(tokenId);
        return removed > 0;
    }
    async getAll() {
        const users = await this.userRepository.getAll({});
        return users;
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map