"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("./Repository"));
const User_1 = __importDefault(require("../model/User"));
const Post_1 = __importDefault(require("./Post"));
class UserRepo extends Repository_1.default {
    constructor() {
        super(...arguments);
        this.postRepo = new Post_1.default();
    }
    getById(id) {
        return User_1.default.findOne({
            where: {
                id
            }
        });
    }
    getAll(filter) {
        return User_1.default.findAll({
            where: Object.assign({}, filter)
        });
    }
    getByUserName(username) {
        return User_1.default.findOne({
            where: {
                username
            }
        });
    }
    insert(data) {
        console.log(data);
        return User_1.default.create(Object.assign({}, data));
    }
    updateById(id, updates) {
        return User_1.default.update(updates, {
            where: { id }
        });
    }
    searchByUsername(username) {
        return User_1.default.findAll({
            where: {
                username
            }
        });
    }
    destroyById(id) {
        return User_1.default.destroy({
            where: {
                id
            }
        });
    }
    destroy(updates) {
        return User_1.default.destroy({
            where: Object.assign({}, updates)
        });
    }
    getUserPosts(id) {
        return this.postRepo.getByAuthor(id);
    }
}
exports.default = UserRepo;
//# sourceMappingURL=User.js.map