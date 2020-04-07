"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Post_1 = __importDefault(require("../repository/Post"));
class PostService {
    constructor() {
        this.postRepository = new Post_1.default();
    }
    static getInstance() {
        if (!PostService.instance) {
            PostService.instance = new PostService();
        }
        return PostService.instance;
    }
    async getById(id) {
        return this.postRepository.getById(id);
    }
    async getAll() {
        return this.postRepository.getAllWithLikes({});
    }
    add(newPost, userId) {
        return this.postRepository.insert(Object.assign(Object.assign({}, newPost), { userId }));
    }
    async updateById(id, newPost) {
        const [updated] = await this.postRepository.updateById(id, newPost);
        return updated > 0;
    }
    async removeById(id) {
        const removed = await this.postRepository.destroyById(id);
        return removed > 0;
    }
    async getLikesById(id) {
        const likes = await this.postRepository.getLikesById(id);
        return likes;
    }
    async likeById(id, userId) {
        const like = await this.postRepository.likeById(id, userId);
        return like;
    }
    async unlikeById(id, userId) {
        const removed = await this.postRepository.unlikeById(id, userId);
        return removed > 0;
    }
    async checkPostAuthority(id, userId) {
        const post = await this.getById(id);
        return post.userId === userId;
    }
    async getBetweenDates(startDate, endDate) {
        const posts = await this.postRepository.getBetweenDates(new Date(startDate), new Date(endDate));
        return posts;
    }
}
exports.default = PostService;
//# sourceMappingURL=PostService.js.map