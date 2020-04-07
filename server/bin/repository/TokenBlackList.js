"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("./Repository"));
const TokenBlackList_1 = __importDefault(require("../model/TokenBlackList"));
class TokenBlackListRepo extends Repository_1.default {
    getById(id) {
        return TokenBlackList_1.default.findOne({
            where: {
                id
            }
        });
    }
    getAll(filter) {
        return TokenBlackList_1.default.findAll({
            where: Object.assign({}, filter)
        });
    }
    insert(data) {
        return TokenBlackList_1.default.create(data);
    }
    updateById(id, updates) {
        return TokenBlackList_1.default.update(updates, {
            where: {
                id
            }
        });
    }
    destroyById(id) {
        return TokenBlackList_1.default.destroy({
            where: {
                id
            }
        });
    }
    destroy(updates) {
        return TokenBlackList_1.default.destroy({
            where: Object.assign({}, updates)
        });
    }
}
exports.default = TokenBlackListRepo;
//# sourceMappingURL=TokenBlackList.js.map