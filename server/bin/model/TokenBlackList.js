"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const postgres_db_1 = __importDefault(require("../postgres-db"));
const utils_1 = require("../postgres-db/utils");
class TokenBlacklist extends sequelize_1.default.Model {
}
// Model definition
TokenBlacklist.init({
    id: { defaultValue: utils_1.generateId.smallint, type: sequelize_1.default.SMALLINT, primaryKey: true },
    token: { type: sequelize_1.default.TEXT, allowNull: false },
    userId: {
        type: sequelize_1.default.SMALLINT,
        field: 'user_id',
        allowNull: false
    }
}, {
    sequelize: postgres_db_1.default,
    modelName: 'token_blacklist',
    tableName: 'token_blacklist'
});
exports.default = TokenBlacklist;
//# sourceMappingURL=TokenBlackList.js.map