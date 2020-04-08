"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("./Repository"));
const User_1 = __importDefault(require("../model/User"));
const Post_1 = __importDefault(require("./Post"));
const sequelize_1 = __importDefault(require("sequelize"));
class UserRepo extends Repository_1.default {
    constructor() {
        super(...arguments);
        this.postRepo = new Post_1.default();
    }
    getById(id, showPassword) {
        return User_1.default.findOne({
            where: {
                id
            },
            attributes: {
                exclude: [showPassword === true ? '' : 'password']
            }
        });
    }
    getAll(filter) {
        return User_1.default.findAll({
            where: Object.assign({}, filter),
            attributes: {
                exclude: ['password']
            }
        });
    }
    getByUserName(username, showPassword) {
        return User_1.default.findOne({
            where: {
                username
            },
            attributes: {
                exclude: [showPassword === true ? '' : 'password']
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
                username: {
                    [sequelize_1.default.Op.iLike]: `%${username}%`
                }
            },
            attributes: {
                exclude: ['password']
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