"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const UserService_1 = __importDefault(require("../../service/UserService"));
const userService = UserService_1.default.getInstance();
async function authMiddleware(req, res, next) {
    const { userId } = req.params;
    const { tokenId } = req.payload;
    if (userService.checkToken(parseInt(tokenId), parseInt(userId))) {
        next();
    }
    else {
        res.status(http_status_codes_1.UNAUTHORIZED).json({
            status: 'error',
            message: 'Você não tem autorização para realizar a operação.'
        });
    }
}
exports.default = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map