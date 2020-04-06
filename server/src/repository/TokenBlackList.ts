import IRepository from './Repository';
import TokenBlackList from '../model/TokenBlackList';

class TokenBlackListRepo extends IRepository<TokenBlackList, TokenBlackListEntity> {
    getById(id: number) {
        return TokenBlackList.findOne({
            where: {
                id
            }
        })
    }

    getAll(filter: Partial<TokenBlackListEntity>) {
        return TokenBlackList.findAll({
            where: {
                ...filter
            }
        })
    }

    insert(data: TokenBlackListEntity) {
        return TokenBlackList.create(data)
    }

    updateById(id: number, updates: Partial<TokenBlackListEntity>) {
        return TokenBlackList.update(updates, {
            where: {
                id
            }
        })
    }

    destroyById(id: number) {
        return TokenBlackList.destroy({
            where: {
                id
            }
        })
    }

    destroy(updates: Partial<TokenBlackListEntity>) {
        return TokenBlackList.destroy({
            where: {
                ...updates
            }
        })
    }
}

export default TokenBlackListRepo