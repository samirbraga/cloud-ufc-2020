import { JwtManager } from '@overnightjs/jwt'
import aws from 'aws-sdk'
import url from 'url'
import UserRepo from '../repository/User';
import TokenBlackListRepo from '../repository/TokenBlackList';

const credentials = new aws.Credentials({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN
})

setInterval(() => {
    if (credentials.needsRefresh) {
        credentials.refresh(err => {})
    }
}, 2 * 60 * 1000)

export const s3 = new aws.S3(credentials)

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
        const user = await this.userRepository.getByUserName(username, true)
        if (user && user.password === password) {
            return user.id
        } else {
            return undefined
        }
    }

    private deleteImage(imageUrl: string) {
        return new Promise((resolve, reject) => {
            s3.deleteObject({
                Bucket: process.env.AWS_S3_BUCKET,
                Key: url.parse(imageUrl).path
            }).send(err => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    public async updateById(id: number, newUser: UserEntity): Promise<boolean> {
        const oldUser = await this.userRepository.getById(id)
        if (newUser.profilePhoto) {
            try {
                await this.deleteImage(oldUser.profilePhoto) 
            } catch {}
        }

        const [updated] = await this.userRepository.updateById(id, newUser)
        return updated > 0
    }

    public async removeById(id: number): Promise<boolean> {
        const oldUser = await this.userRepository.getById(id)
        try {
            await this.deleteImage(oldUser.profilePhoto)
        } catch {}
        const removed = await this.userRepository.destroyById(id)
        return removed > 0
    }

    public async logout(tokenId: number): Promise<boolean> {
        const removed = await this.tokenRepository.destroyById(tokenId)

        return removed > 0
    }

    public async getAll(): Promise<UserEntity[]> {
        const users = await this.userRepository.getAll({})
        return users
    }

    public async searchByUsername(username: string): Promise<UserEntity[]> {
        const users = await this.userRepository.searchByUsername(username)
        return users
    }
}

export default UserService
