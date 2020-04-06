import IRepository from './Repository';
import User from '../model/User';

class UserRepo extends IRepository<User, UserEntity> {
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
        return User.create(data)
    }

    updateById(id: number, updates: Partial<UserEntity>) {
        return User.update(updates, {
            where: { id }
        })
    }

    searchByUsername(username: string) {
        return User.findAll({
            where: {
                username
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
}

export default UserRepo