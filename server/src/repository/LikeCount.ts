import IRepository from './Repository';
import { datastore } from '../model/LikeCount';

class LikeCountRepo extends IRepository<LikeCountEntity> {
    kind = 'like_count'

    getById(id: string) {
        return new Promise<LikeCountEntity>(() => {})
    }

    getAll(filter: Partial<LikeCountEntity>) {
        return new Promise<LikeCountEntity[]>(() => {})
    }

    async insert(data: LikeCountEntity) {
        const taskKey = datastore.key([this.kind, data.postId])
        const task = {
          key: taskKey,
          data: {
            count: data.likesCount,
          }
        }
        await datastore.save(task)
        return data
    }

    async increment(postId: number) {
        const key = datastore.key([this.kind, postId])
        const [entity] = await datastore.get(key)
        
        return await datastore.update({
            key,
            data: {
                ...entity,
                count: entity.count + 1
            }
        })
    }


    async dencrement(postId: number) {
        const key = datastore.key([this.kind, postId])
        const [entity] = await datastore.get(key)
        
        return await datastore.update({
            key,
            data: {
                ...entity,
                count: entity.count - 1
            }
        })
    }

    updateById(id: number, updates: Partial<LikeCountEntity>) {
        return new Promise<[number, LikeCountEntity[]]>(() => {})
    }

    destroyById(id: number) {
        return new Promise<number>(() => {})
    }

    destroy(updates: Partial<LikeCountEntity>) {
        return new Promise<number>(() => {})
    }
}

export default LikeCountRepo