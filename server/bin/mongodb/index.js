"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const fs_1 = require("fs");
const { AWS_DOCDB_USER, AWS_DOCDB_PASS, AWS_DOCDB_HOST } = process.env;
const db = mongoose_1.default.createConnection(`mongodb://${AWS_DOCDB_USER}:${AWS_DOCDB_PASS}@${AWS_DOCDB_HOST}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslValidate: false,
    sslCA: [fs_1.readFileSync('rds-combined-ca-bundle.pem')]
});
exports.default = db;
//# sourceMappingURL=index.js.map