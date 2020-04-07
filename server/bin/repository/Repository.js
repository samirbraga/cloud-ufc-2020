"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../postgres-db/utils");
class IRepository {
    generateId() {
        return utils_1.generateId.smallint();
    }
}
exports.default = IRepository;
//# sourceMappingURL=Repository.js.map