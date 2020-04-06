import PostRepo from '../repository/Post';
import Singleton from '../utils/Singleton';

class PostService extends Singleton {
    private postRepository = new PostRepo()

    public static getInstance<T = PostService>(): T {
        return super.getInstance<T>()
    }

    public async getById(id: number): Promise<PostEntity> {
        return this.postRepository.getById(id)
    }

    public add(newPost: PostEntity) {
        return this.postRepository.insert(newPost)
    }

    public async updateById(id: number, newPost: PostEntity): Promise<boolean> {
        const [updated] = await this.postRepository.updateById(id, newPost)

        return updated > 0
    }

    public async removeById(id: number): Promise<boolean> {
        const removed = await this.postRepository.destroyById(id)

        return removed > 0
    }

    public async getLikesById(id: number): Promise<LikeEntity[]> {
        const likes = await this.postRepository.getLikesById(id)

        return likes
    }

    public async likeById(id: number, userId: number): Promise<LikeEntity> {
        const like = await this.postRepository.likeById(id, userId)

        return like
    }
}

export default PostService