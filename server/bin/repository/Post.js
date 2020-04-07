"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("./Repository"));
const Post_1 = __importDefault(require("../model/Post"));
const Like_1 = __importDefault(require("./Like"));
const User_1 = __importDefault(require("../model/User"));
const Like_2 = __importDefault(require("../model/Like"));
const LikeCount_1 = __importDefault(require("./LikeCount"));
class PostRepo extends Repository_1.default {
    constructor() {
        super(...arguments);
        this.likeRepo = new Like_1.default();
        this.likeCountRepo = new LikeCount_1.default();
    }
    getById(id) {
        return Post_1.default.findOne({
            where: {
                id
            }
        });
    }
    getAll(filter) {
        return Post_1.default.findAll({
            where: Object.assign({}, filter)
        });
    }
    getAllWithLikes(filter) {
        return Post_1.default.findAll({
            where: Object.assign({}, filter),
            include: [{
                    model: User_1.default,
                    through: {
                        attributes: []
                    }
                }]
        });
    }
    getLikesById(id) {
        return Like_2.default.findAll({
            where: {
                id
            },
            include: [{
                    model: User_1.default
                }]
        });
    }
    insert(data) {
        return Post_1.default.create(data);
    }
    updateById(id, updates) {
        return Post_1.default.update(updates, {
            where: {
                id
            }
        });
    }
    likeById(postId, userId) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.likeRepo.insert({
                    postId,
                    userId
                }),
                this.likeCountRepo.increment(postId)
            ])
                .then(([like]) => {
                resolve(like);
            })
                .catch(reject);
        });
    }
    unlikeById(postId, userId) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.likeRepo.destroy({
                    postId,
                    userId
                }),
                this.likeCountRepo.dencrement(postId)
            ])
                .then(([removed]) => {
                resolve(removed);
            })
                .catch(reject);
        });
    }
    destroyById(id) {
        return Post_1.default.destroy({
            where: {
                id
            }
        });
    }
    destroy(updates) {
        return Post_1.default.destroy({
            where: Object.assign({}, updates)
        });
    }
    getByAuthor(userId) {
        return this.getAllWithLikes({
            userId
        });
    }
    getBetweenDates(startDate, endDate) {
        return this.getAllWithLikes({
            publicationDate: {
                $between: [startDate, endDate]
            }
        });
    }
}
exports.default = PostRepo;
//# sourceMappingURL=Post.js.map