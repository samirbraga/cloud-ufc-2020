"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_1 = __importDefault(require("../mongodb"));
const likeCountSchema = new mongoose_1.default.Schema({
    postId: Number,
    likesCount: Number
});
const LikeCount = mongodb_1.default.model('likecount', likeCountSchema, 'likecount');
exports.default = LikeCount;
//# sourceMappingURL=LikeCount.js.map