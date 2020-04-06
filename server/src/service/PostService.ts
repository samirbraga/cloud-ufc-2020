import PostRepo from '../repository/Post';

class PostService {
    private postRepository = new PostRepo()
    private static instance: PostService    

    public static getInstance() {
        if (!PostService.instance) {
            PostService.instance = new PostService()
        }

        return PostService.instance
    }

    public async getById(id: number): Promise<PostEntity> {
        return this.postRepository.getById(id)
    }

    public async getAll(): Promise<PostEntity[]> {
        return this.postRepository.getAllWithLikes({})
    }

    public add(newPost: PostEntity, userId: number) {
        return this.postRepository.insert({
            ...newPost,
            userId
        })
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

    public async unlikeById(id: number, userId: number): Promise<boolean> {
        const removed = await this.postRepository.unlikeById(id, userId)
        return removed > 0
    }

    public async checkPostAuthority(id: number, userId: number): Promise<boolean> {
        const post = await this.getById(id)
        return post.userId === userId
    }

    public async getBetweenDates(startDate: string, endDate: string): Promise<PostEntity[]> {
        const posts = await this.postRepository.getBetweenDates(new Date(startDate), new Date(endDate))
        return posts
    }
}

export default PostService