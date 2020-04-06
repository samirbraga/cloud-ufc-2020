import IRepository from './Repository';
import User, { IUser } from '../model/User';

class UserRepo implements IRepository<User, IUser> {
    getById(id: number) {
        return User.findOne({
            where: {
                id
            }
        })
    }

    getAll(filter: Partial<IUser>) {
        return User.findAll({
            where: {
                ...filter
            }
        })
    }

    insert(data: IUser) {
        return User.create(data)
    }

    updateById(id: string, updates: Partial<IUser>) {
        return User.update(updates, {
            where: {
                id
            }
        })
    }

    searchByUsername(username: string) {
        return User.findAll({
            where: {
                username
            }
        })
    }

    destroyById(id: string) {
        return User.destroy({
            where: {
                id
            }
        })
    }

    destroy(updates: Partial<IUser>) {
        return User.destroy({
            where: {
                ...updates
            }
        })
    }
}

export default UserRepo