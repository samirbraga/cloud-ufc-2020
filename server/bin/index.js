"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const Server_1 = __importDefault(require("./Server"));
const appServer = new Server_1.default();
appServer.start(parseInt(process.env.PORT) || 3000);
//# sourceMappingURL=index.js.map