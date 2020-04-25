"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const multer_google_storage_1 = __importDefault(require("multer-google-storage"));
exports.upload = multer_1.default({
    storage: new multer_google_storage_1.default({
        filename(req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        }
    })
});
//# sourceMappingURL=multerGCS.js.map