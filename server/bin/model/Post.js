"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const postgres_db_1 = __importDefault(require("../postgres-db"));
const utils_1 = require("../postgres-db/utils");
const User_1 = __importDefault(require("./User"));
const Like_1 = __importDefault(require("./Like"));
class Post extends sequelize_1.default.Model {
}
// Model definition
Post.init({
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
    publicationDate: {
        type: sequelize_1.default.DATE,
        field: 'publication_date',
        allowNull: false
    },
    s3Address: {
        type: sequelize_1.default.TEXT,
        field: 's3_address',
        allowNull: false
    }
}, {
    sequelize: postgres_db_1.default,
    modelName: 'posts',
    tableName: 'posts'
});
Post.belongsToMany(User_1.default, {
    through: Like_1.default,
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
User_1.default.belongsToMany(Post, {
    through: Like_1.default,
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
exports.default = Post;
//# sourceMappingURL=Post.js.map