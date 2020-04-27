"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("./Repository"));
const LikeCount_1 = require("../model/LikeCount");
class LikeCountRepo extends Repository_1.default {
    constructor() {
        super(...arguments);
        this.kind = 'like_count';
    }
    getById(id) {
        return new Promise(() => { });
    }
    getAll(filter) {
        return new Promise(() => { });
    }
    async insert(data) {
        const taskKey = LikeCount_1.datastore.key([this.kind, data.postId]);
        const task = {
            key: taskKey,
            data: {
                count: data.likesCount,
            }
        };
        await LikeCount_1.datastore.save(task);
        return data;
    }
    async increment(postId) {
        const key = LikeCount_1.datastore.key([this.kind, postId]);
        const [entity] = await LikeCount_1.datastore.get(key);
        return await LikeCount_1.datastore.update({
            key,
            data: Object.assign(Object.assign({}, entity), { count: entity.count + 1 })
        });
    }
    async dencrement(postId) {
        const key = LikeCount_1.datastore.key([this.kind, postId]);
        const [entity] = await LikeCount_1.datastore.get(key);
        return await LikeCount_1.datastore.update({
            key,
            data: Object.assign(Object.assign({}, entity), { count: entity.count - 1 })
        });
    }
    updateById(id, updates) {
        return new Promise(() => { });
    }
    destroyById(id) {
        return new Promise(() => { });
    }
    destroy(updates) {
        return new Promise(() => { });
    }
}
exports.default = LikeCountRepo;
//# sourceMappingURL=LikeCount.js.map