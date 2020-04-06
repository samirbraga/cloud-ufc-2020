import sequelize from 'sequelize';
import { JwtManager } from '@overnightjs/jwt'
import UserRepo from '../repository/User';
import TokenBlackListRepo from '../repository/TokenBlackList';

class UserService {
    private userRepository = new UserRepo()
    private tokenRepository = new TokenBlackListRepo()
    
    public async getById(id: number): Promise<UserEntity> {
        return this.userRepository.getById(id)
    }

    public async generateToken(userId: number): Promise<TokenBlackListEntity> {
        const tokenId = this.tokenRepository.generateId()
        const token = JwtManager.jwt({
            userId,
            tokenId
        })

        return await this.tokenRepository.insert({
            id: tokenId,
            token
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