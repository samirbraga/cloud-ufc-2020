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
const sequelize_1 = __importDefault(require("sequelize"));
const { Op } = sequelize_1.default;
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
        console.log(filter);
        return Post_1.default.findAll({
            where: filter,
            order: [
                ['publicationDate', 'DESC']
            ],
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
        const postId = this.generateId();
        this.likeCountRepo.insert({
            postId,
            likesCount: 0
        });
        return Post_1.default.create(Object.assign({ id: postId }, data));
    }
    updateById(id, updates) {
        return Post_1.default.update(updates, {
            where: {
                id
            }
        });
    }
    likeById(postId, userId) {
        this.likeCountRepo.increment(postId).then(() => { }).catch(err => { });
        return this.likeRepo.insert({
            postId,
            userId
        });
    }
    unlikeById(postId, userId) {
        this.likeCountRepo.dencrement(postId).then(() => { }).catch(err => { });
        return this.likeRepo.destroy({
            postId,
            userId
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
                [Op.between]: [startDate.toISOString(), endDate.toISOString()]
            }
        });
    }
}
exports.default = PostRepo;
//# sourceMappingURL=Post.js.map