import expressAsyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { OK, CREATED } from 'http-status-codes'
import { JwtManager, ISecureRequest } from '@overnightjs/jwt'
import UserService from '../service/UserService'
import { Delete, Controller, Post, Put, Get, Middleware, ClassWrapper } from '@overnightjs/core'
import authMiddleware from './middlewares/authMiddleware'
import { upload, S3MulterFile } from './multerS3'


@Controller('api/user')
@ClassWrapper(expressAsyncHandler)
class UserController {
    private userService = UserService.getInstance()


    @Get('search')
    public async searchByUsername(req: Request, res: Response) {
        const { q } = req.query
        const users = await this.userService.searchByUsername(q)

        if (Array.isArray(users)) {
            res.status(OK).json(users)
        } else {
            throw new Error('Não foi possível retornar os usuários.')
        }
    }

    @Get()
    public async getAll(req: ISecureRequest, res: Response) {
        const users = await this.userService.getAll()

        if (Array.isArray(users)) {
            res.status(OK).json(users)
        } else {
            throw new Error('Não foi possível retornar os usuários.')
        }
    }

    @Get(':userId/posts')
    public async userPosts(req: ISecureRequest, res: Response) {
        const { userId } = req.params

        const posts = await this.userService.getUserPosts(parseInt(userId))

        if (Array.isArray(posts)) {
            res.status(OK).json(posts)
        } else {
            throw new Error('Não foi possível remover o usuário.')
        }
    }
    
    @Delete('signout')
    @Middleware([
        JwtManager.middleware,
        authMiddleware
    ])
    public async logout(req: ISecureRequest, res: Response) {
        const { tokenId } = req.payload
        const removed = await this.userService.logout(tokenId)

        if (removed) {
            res.status(OK).end()
        } else {
            throw new Error('Não foi possível fazer logout.')
        }
    }
    
    @Post('signup')
    @Middleware(upload.single('profilePhoto'))
    public async create(req: Request & S3MulterFile, res: Response) {
        const { body } = req

        if (req.file && req.file.location) {
            body.profilePhoto = req.file.location
        } else {
            delete body.profilePhoto
        }

        const user = await this.userService.add(body)
        const token = await this.userService.generateToken(user.id)

        if (user) {
            res.status(CREATED).json({
                user,
                token
            })
        } else {
            throw new Error('Não foi possível criar o usuário.')
        }
    }
    
    @Post('signin')
    public async login(req: Request, res: Response) {
        const { username, password } = req.body
        const userId = await this.userService.login(username, password)        
        if (userId) {
            const token = await this.userService.generateToken(userId)
            res.status(CREATED).json({
                userId,
                token
            })
        } else {
            throw new Error('Não foi possível fazer login.')
        }
    }
    
    @Get(':userId')
    public async get(req: ISecureRequest, res: Response) {
        const { userId } = req.params

        const user = await this.userService.getById(parseInt(userId))

        if (user) {
            res.status(OK).json(user)
        } else {
            throw new Error('Não foi possível atualizar os dados do usuário.')
        }
    }
    
    @Put(':userId')
    @Middleware([
        JwtManager.middleware,
        authMiddleware,
        upload.single('profilePhoto')
    ])
    public async update(req: ISecureRequest & S3MulterFile, res: Response) {
        const { userId } = req.params
        const { body } = req

        if (req.file && req.file.location) {
            body.profilePhoto = req.file.location
        } else {
            delete body.profilePhoto
        }

        const updated = await this.userService.updateById(parseInt(userId), body)

        if (updated) {
            res.status(OK).end()
        } else {
            throw new Error('Não foi possível atualizar os dados do usuário.')
        }
    }
    
    @Delete(':userId')
    @Middleware([
        JwtManager.middleware,
        authMiddleware
    ])
    public async destroy(req: ISecureRequest, res: Response) {
        const { userId } = req.params
        const removed = await this.userService.removeById(parseInt(userId))

        if (removed) {
            res.status(OK).end()
        } else {
            throw new Error('Não foi possível remover o usuário.')
        }
    }
}

export default UserController