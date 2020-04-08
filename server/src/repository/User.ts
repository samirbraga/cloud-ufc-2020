import IRepository from './Repository';
import User from '../model/User';
import Post from '../model/Post';
import PostRepo from './Post';
import sequelize from 'sequelize';

class UserRepo extends IRepository<User, UserEntity> {
    private postRepo = new PostRepo()

    getById(id: number, showPassword?: boolean) {
        return User.findOne({
            where: {
                id
            },
            attributes: {
                exclude: [showPassword === true ? '' : 'password']
            }
        })
    }

    getAll(filter: Partial<UserEntity>) {
        return User.findAll({
            where: {
                ...filter
            },
            attributes: {
                exclude: ['password']
            }
        })
    }

    getByUserName(username: string, showPassword?: boolean) {
        return User.findOne({
            where: {
                username
            },
            attributes: {
                exclude: [showPassword === true ? '' : 'password']
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
            },
            attributes: {
                exclude: ['password']
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