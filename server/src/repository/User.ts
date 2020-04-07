import IRepository from './Repository';
import User from '../model/User';
import Post from '../model/Post';
import PostRepo from './Post';
import sequelize from 'sequelize';

class UserRepo extends IRepository<User, UserEntity> {
    private postRepo = new PostRepo()

    getById(id: number) {
        return User.findOne({
            where: {
                id
            }
        })
    }

    getAll(filter: Partial<UserEntity>) {
        return User.findAll({
            where: {
                ...filter
            }
        })
    }

    getByUserName(username: string) {
        return User.findOne({
            where: {
                username
            }
        })
    }

    insert(data: UserEntity) {
        console.log(data)
        return User.create({
            ...data
        })
    }

    updateById(id: number, updates: Partial<UserEntity>) {
        return User.update(updates, {
            where: { id }
        })
    }

    searchByUsername(username: string) {
        return User.findAll({
            where: {
                username: {
                    [sequelize.Op.iLike]: `%${username}%`
                }
            }
        })
    }

    destroyById(id: number) {
        return User.destroy({
            where: {
                id
            }
        })
    }

    destroy(updates: Partial<UserEntity>) {
        return User.destroy({
            where: {
                ...updates
            }
        })
    }

    getUserPosts(id: number) {
        return this.postRepo.getByAuthor(id)
    }
}

export default UserRepo