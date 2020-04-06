import IRepository from './Repository';
import Post, { IPost } from '../model/Post';
import LikeRepo from './Like';
import User from '../model/User';
import Like from '../model/Like';

class PostRepo implements IRepository<Post, IPost> {
    private likeRepo: LikeRepo = new LikeRepo()

    getById(id: number) {
        return Post.findOne({
            where: {
                id
            }
        })
    }

    getAll(filter: Partial<IPost>) {
        return Post.findAll({
            where: {
                ...filter
            }
        })
    }

    getAllWithLikes(filter: Partial<IPost>) {
        return Post.findAll({
            where: {
                ...filter
            },
            include: [{
                model: Like,
                through: {
                    attributes: []
                }
            }]
        })
    }

    getLikesById(id: number) {
        return Post.findOne({
            where: {
                id
            },
            include: [{
                model: Like,
                through: {
                    attributes: []
                }
            }]
        })
    }

    insert(data: IPost) {
        return Post.create(data)
    }

    updateById(id: string, updates: Partial<IPost>) {
        return Post.update(updates, {
            where: {
                id
            }
        })
    }

    likeById(postId: number, userId: number) {
        return this.likeRepo.insert({
            postId,
            userId
        })
    }

    unlikeById(postId: number, userId: number) {
        return this.likeRepo.destroy({
            postId,
            userId
        })
    }

    destroyById(id: string) {
        return Post.destroy({
            where: {
                id
            }
        })
    }

    destroy(updates: Partial<IPost>) {
        return Post.destroy({
            where: {
                ...updates
            }
        })
    }
}

export default PostRepo