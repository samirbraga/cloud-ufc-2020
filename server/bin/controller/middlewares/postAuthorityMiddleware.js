"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const PostService_1 = __importDefault(require("../../service/PostService"));
const postService = PostService_1.default.getInstance();
async function postAuthorityMiddleware(req, res, next) {
    const { userId, postId } = req.params;
    if (postService.checkPostAuthority(parseInt(postId), parseInt(userId))) {
        next();
    }
    else {
        res.status(http_status_codes_1.UNAUTHORIZED).json({
            status: 'error',
            message: 'Você não tem autorização para realizar a operação.'
        });
    }
}
exports.default = postAuthorityMiddleware;
//# sourceMappingURL=postAuthorityMiddleware.js.map