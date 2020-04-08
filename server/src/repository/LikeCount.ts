import IRepository from './Repository';
import LikeCount, { ILikeCount } from '../model/LikeCount';

class LikeCountRepo extends IRepository<ILikeCount, LikeCountEntity> {
    getById(id: string) {
        return LikeCount.findById(id).exec()
    }

    getAll(filter: Partial<LikeCountEntity>) {
        return LikeCount.find({
            ...filter
        }).exec()
    }

    insert(data: LikeCountEntity) {
        const newLikeCount = new LikeCount(data)
        return newLikeCount.save()
    }

    increment(postId: number) {
        return LikeCount.findOneAndUpdate({
            postId
        }, {
            $inc: {
                'likesCount': 1
            }
        }).exec()
    }


    dencrement(postId: number) {
        return LikeCount.findOneAndUpdate({
            postId
        }, {
            $dec: {
                'likesCount': 1
            }
        }).exec()
    }

    updateById(id: number, updates: Partial<LikeCountEntity>) {
        return new Promise((resolve, reject) => {
            LikeCount.findByIdAndUpdate(id, updates).exec()
            .then(likeCount => {
                if (likeCount) {
                    resolve([1, [likeCount]])
                } else {
                    resolve([0, []])
                }
            })
            .catch(reject)
        }) as Promise<[number, ILikeCount[]]>
    }

    destroyById(id: number) {
        return new Promise((resolve, reject) => {
            LikeCount.findByIdAndRemove(id).exec()
            .then(likeCount => {
                if (likeCount) {
                    resolve(1)
                } else {
                    resolve(0)
                }
            })
            .catch(reject)
        }) as Promise<number>
    }

    destroy(updates: Partial<LikeCountEntity>) {
        return new Promise((resolve, reject) => {
            LikeCount.remove(updates).exec()
            .then(likeCounts => {
                resolve(likeCounts.deletedCount)
            })
            .catch(reject)
        }) as Promise<number>
    }
}

export default LikeCountRepo