import IRepository from './Repository';
import Like, { ILike } from '../model/Like';

class LikeRepo implements IRepository<Like, ILike> {
    getById(id: number) {
        return Like.findOne({
            where: {
                id
            }
        })
    }

    getAll(filter: Partial<ILike>) {
        return Like.findAll({
            where: {
                ...filter
            }
        })
    }

    insert(data: ILike) {
        return Like.create(data)
    }

    updateById(id: string, updates: Partial<ILike>) {
        return Like.update(updates, {
            where: {
                id
            }
        })
    }

    destroyById(id: string) {
        return Like.destroy({
            where: {
                id
            }
        })
    }

    destroy(updates: Partial<ILike>) {
        return Like.destroy({
            where: {
                ...updates
            }
        })
    }
}

export default LikeRepo