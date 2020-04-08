"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Repository_1 = __importDefault(require("./Repository"));
const LikeCount_1 = __importDefault(require("../model/LikeCount"));
class LikeCountRepo extends Repository_1.default {
    getById(id) {
        return LikeCount_1.default.findById(id).exec();
    }
    getAll(filter) {
        return LikeCount_1.default.find(Object.assign({}, filter)).exec();
    }
    insert(data) {
        const newLikeCount = new LikeCount_1.default(data);
        return newLikeCount.save();
    }
    increment(postId) {
        return LikeCount_1.default.findOneAndUpdate({
            postId
        }, {
            $inc: {
                'likesCount': 1
            }
        }).exec();
    }
    dencrement(postId) {
        return LikeCount_1.default.findOneAndUpdate({
            postId
        }, {
            $dec: {
                'likesCount': 1
            }
        }).exec();
    }
    updateById(id, updates) {
        return new Promise((resolve, reject) => {
            LikeCount_1.default.findByIdAndUpdate(id, updates).exec()
                .then(likeCount => {
                if (likeCount) {
                    resolve([1, [likeCount]]);
                }
                else {
                    resolve([0, []]);
                }
            })
                .catch(reject);
        });
    }
    destroyById(id) {
        return new Promise((resolve, reject) => {
            LikeCount_1.default.findByIdAndRemove(id).exec()
                .then(likeCount => {
                if (likeCount) {
                    resolve(1);
                }
                else {
                    resolve(0);
                }
            })
                .catch(reject);
        });
    }
    destroy(updates) {
        return new Promise((resolve, reject) => {
            LikeCount_1.default.remove(updates).exec()
                .then(likeCounts => {
                resolve(likeCounts.deletedCount);
            })
                .catch(reject);
        });
    }
}
exports.default = LikeCountRepo;
//# sourceMappingURL=LikeCount.js.map