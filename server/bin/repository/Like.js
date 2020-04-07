"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("./Repository"));
const Like_1 = __importDefault(require("../model/Like"));
class LikeRepo extends Repository_1.default {
    getById(id) {
        return Like_1.default.findOne({
            where: {
                id
            }
        });
    }
    getAll(filter) {
        return Like_1.default.findAll({
            where: Object.assign({}, filter)
        });
    }
    insert(data) {
        return Like_1.default.create(data);
    }
    updateById(id, updates) {
        return Like_1.default.update(updates, {
            where: {
                id
            }
        });
    }
    destroyById(id) {
        return Like_1.default.destroy({
            where: {
                id
            }
        });
    }
    destroy(updates) {
        return Like_1.default.destroy({
            where: Object.assign({}, updates)
        });
    }
}
exports.default = LikeRepo;
//# sourceMappingURL=Like.js.map