"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const postgres_db_1 = __importDefault(require("../postgres-db"));
const utils_1 = require("../postgres-db/utils");
class User extends sequelize_1.default.Model {
}
exports.User = User;
// Model definition
User.init({
    id: { defaultValue: utils_1.generateId.smallint, type: sequelize_1.default.SMALLINT, primaryKey: true },
    username: { type: sequelize_1.default.TEXT, allowNull: false, unique: true },
    email: { type: sequelize_1.default.TEXT, allowNull: false, unique: true },
    password: { type: sequelize_1.default.TEXT, allowNull: false },
    firstName: {
        type: sequelize_1.default.TEXT,
        allowNull: false,
        field: 'firstname'
    },
    lastName: {
        type: sequelize_1.default.TEXT,
        allowNull: false,
        field: 'lastname'
    },
    birthdate: sequelize_1.default.DATE,
    profilePhoto: {
        type: sequelize_1.default.TEXT,
        field: 'profile_photo'
    }
}, {
    sequelize: postgres_db_1.default,
    modelName: 'users',
    tableName: 'users'
});
exports.default = User;
//# sourceMappingURL=User.js.map