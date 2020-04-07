"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config"));
const sequelize = new sequelize_1.Sequelize(config_1.default.DB_NAME, config_1.default.DB_USER, config_1.default.DB_PASS, {
    dialect: 'postgres',
    quoteIdentifiers: false,
    host: config_1.default.DB_HOST,
    port: parseInt(config_1.default.DB_PORT),
    define: {
        timestamps: false,
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_general_ci_ai'
    }
});
exports.default = sequelize;
//# sourceMappingURL=index.js.map