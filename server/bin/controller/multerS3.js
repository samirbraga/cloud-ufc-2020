"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const path_1 = require("path");
const UserService_1 = require("../service/UserService");
exports.upload = multer_1.default({
    storage: multer_s3_1.default({
        s3: UserService_1.s3,
        bucket: process.env.AWS_S3_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString() + path_1.extname(file.originalname));
        },
        acl: 'public-read'
    })
});
//# sourceMappingURL=multerS3.js.map