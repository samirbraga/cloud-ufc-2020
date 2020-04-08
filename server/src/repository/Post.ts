import IRepository from './Repository';
import Post from '../model/Post';
import LikeRepo from './Like';
import User from '../model/User';
import Like from '../model/Like';
import LikeCountRepo from './LikeCount';

class PostRepo extends IRepository<Post, PostEntity> {
    private likeRepo: LikeRepo = new LikeRepo()
    private likeCountRepo = new LikeCountRepo()

    getById(id: number) {
        return Post.findOne({
            where: {
                id
            }
        })
    }

    getAll(filter: Partial<PostEntity>) {
        return Post.findAll({
            where: {
                ...filter
            }
        })
    }

    getAllWithLikes(filter: any) {
        return Post.findAll({
            where: {
                ...filter
            },
            order: [
                ['publicationDate', 'DESC']
            ],
            include: [{
                model: User,
                through: {
                    attributes: []
                }
            }]
        })
    }

    getLikesById(id: number) {
        return Like.findAll({
            where: {
                id
            },
            include: [{
                model: User
            }]
        })
    }

    insert(data: PostEntity) {
        return Post.create(data)
    }

    updateById(id: number, updates: Partial<PostEntity>) {
        return Post.update(updates, {
            where: {
                id
            }
        })
    }

    likeById(postId: number, userId: number) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.likeRepo.insert({
                    postId,
                    userId
                }),
                this.likeCountRepo.increment(postId)
            ])
            .then(([like]) => {
                resolve(like)
            })
            .catch(reject)
        }) as Promise<LikeEntity>
    }

    unlikeById(postId: number, userId: number) {
        return new Promise((resolve, reject) => {
            Promise.all([
                this.likeRepo.destroy({
                    postId,
                    userId
                }),
                this.likeCountRepo.dencrement(postId)
            ])
            .then(([removed]) => {
                resolve(removed)
            })
            .catch(reject)
        }) as Promise<number>
    }

    destroyById(id: number) {
        return Post.destroy({
            where: {
                id
            }
        })
    }

    destroy(updates: Partial<PostEntity>) {
        return Post.destroy({
            where: {
                ...updates
            }
        })
    }

    getByAuthor(userId: number) {
        return this.getAllWithLikes({
            userId
        })
    }

    getBetweenDates(startDate: Date, endDate: Date) {
        return this.getAllWithLikes({
            publicationDate: {
                $between: [startDate, endDate]
            }
        })
    }
}

export default PostRepo