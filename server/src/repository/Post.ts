import IRepository from './Repository';
import Post from '../model/Post';
import LikeRepo from './Like';
import User from '../model/User';
import Like from '../model/Like';
import LikeCountRepo from './LikeCount';
import sequelize from 'sequelize'

const { Op } = sequelize

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
        console.log(filter)
        return Post.findAll({
            where: filter,
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
        const postId = this.generateId()
        this.likeCountRepo.insert({
            postId,
            likesCount: 0
        })
        return Post.create({
            id: postId,
            ...data
        })
    }

    updateById(id: number, updates: Partial<PostEntity>) {
        return Post.update(updates, {
            where: {
                id
            }
        })
    }

    likeById(postId: number, userId: number) {
        this.likeCountRepo.increment(postId).then(() => {}).catch(err => {})
        return this.likeRepo.insert({
            postId,
            userId
        })
    }

    unlikeById(postId: number, userId: number) {
        this.likeCountRepo.dencrement(postId).then(() => {}).catch(err => {})
        
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

    getByAuthor(userId: number) {
        return this.getAllWithLikes({
            userId
        })
    }

    getBetweenDates(startDate: Date, endDate: Date) {
        return this.getAllWithLikes({
            publicationDate: {
                [Op.between]: [startDate.toISOString(), endDate.toISOString()]
            }
        })
    }
}

export default PostRepo