import IRepository from './Repository';
import Post from '../model/Post';
import LikeRepo from './Like';
import User from '../model/User';
import Like from '../model/Like';

class PostRepo extends IRepository<Post, PostEntity> {
    private likeRepo: LikeRepo = new LikeRepo()

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

    getAllWithLikes(filter: Partial<PostEntity>) {
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
}

export default PostRepo