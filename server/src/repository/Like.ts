import IRepository from './Repository';
import Like from '../model/Like';

class LikeRepo extends IRepository<Like, LikeEntity> {
    getById(id: number) {
        return Like.findOne({
            where: {
                id
            }
        })
    }

    getAll(filter: Partial<LikeEntity>) {
        return Like.findAll({
            where: {
                ...filter
            }
        })
    }

    insert(data: LikeEntity) {
        return Like.create(data)
    }

    updateById(id: number, updates: Partial<LikeEntity>) {
        return Like.update(updates, {
            where: {
                id
            }
        })
    }

    destroyById(id: number) {
        return Like.destroy({
            where: {
                id
            }
        })
    }

    destroy(updates: Partial<LikeEntity>) {
        return Like.destroy({
            where: {
                ...updates
            }
        })
    }
}

export default LikeRepo