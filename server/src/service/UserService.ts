import { JwtManager } from '@overnightjs/jwt'
import UserRepo from '../repository/User';
import TokenBlackListRepo from '../repository/TokenBlackList';

class UserService {
    private userRepository = new UserRepo()
    private tokenRepository = new TokenBlackListRepo()
    private static instance: UserService    

    public static getInstance() {
        if (!UserService.instance) {
            UserService.instance = new UserService()
        }

        return UserService.instance
    }

    
    public async getById(id: number): Promise<UserEntity> {
        return this.userRepository.getById(id)
    }

    public async checkToken(tokenId: number, userId: number): Promise<boolean> {
        const token = await this.tokenRepository.getById(tokenId)
        if (token && token.userId === userId) {
            return true
        } else {
            return false
        }
    }

    public async getUserPosts(userId: number): Promise<PostEntity[]> {
        return this.userRepository.getUserPosts(userId)
    }

    public async generateToken(userId: number): Promise<TokenBlackListEntity> {
        const tokenId = this.tokenRepository.generateId()
        const token = JwtManager.jwt({
            userId,
            tokenId
        })

        return await this.tokenRepository.insert({
            id: tokenId,
            token,
            userId
        })
    }

    public async add(newUser: UserEntity) {
        return this.userRepository.insert(newUser)
    }

    public async login(username: string, password: string): Promise<number | undefined> {
        const user = await this.userRepository.getByUserName(username)
        if (user && user.password === password) {
            return user.id
        } else {
            return undefined
        }
    }

    public async updateById(id: number, newUser: UserEntity): Promise<boolean> {
        const [updated] = await this.userRepository.updateById(id, newUser)

        return updated > 0
    }

    public async removeById(id: number): Promise<boolean> {
        const removed = await this.userRepository.destroyById(id)

        return removed > 0
    }

    public async logout(tokenId: number): Promise<boolean> {
        const removed = await this.tokenRepository.destroyById(tokenId)

        return removed > 0
    }
}

export default UserService