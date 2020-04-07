"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const postgres_db_1 = __importDefault(require("../postgres-db"));
const utils_1 = require("../postgres-db/utils");
const User_1 = __importDefault(require("./User"));
const Post_1 = __importDefault(require("./Post"));
class Like extends sequelize_1.default.Model {
}
// Model definition
Like.init({
    id: { defaultValue: utils_1.generateId.smallint, type: sequelize_1.default.SMALLINT, primaryKey: true },
    userId: {
        type: sequelize_1.default.SMALLINT,
        allowNull: false,
        field: 'user_id',
        references: {
            model: User_1.default,
            key: 'id'
        }
    },
    postId: {
        type: sequelize_1.default.SMALLINT,
        allowNull: false,
        field: 'post_id',
        references: {
            model: Post_1.default,
            key: 'id'
        }
    }
}, {
    sequelize: postgres_db_1.default,
    modelName: 'likes',
    tableName: 'likes'
});
exports.default = Like;
//# sourceMappingURL=Like.js.map