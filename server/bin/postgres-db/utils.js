"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const generateId = (max = 1e9, offset = 1000) => Math.floor(Math.random() * (max - offset)) + offset;
exports.generateId = generateId;
generateId.smallint = () => generateId(32767, 100);
//# sourceMappingURL=utils.js.map