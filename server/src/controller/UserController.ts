import { Request, Response } from 'express'
import { OK, CREATED } from 'http-status-codes'
import { JwtManager, ISecureRequest } from '@overnightjs/jwt'
import { Delete, Controller, Post, Put, Get, Middleware } from '@overnightjs/core'
import UserService from '../service/UserService'
import authMiddleware from './middlewares/authMiddleware'
import { Logger } from '@overnightjs/logger'

@Controller('api/user')
class UserController {
    private userService = UserService.getInstance()

    @Get('posts')
    @Middleware([JwtManager.middleware, authMiddleware])
    public async userPosts(req: ISecureRequest, res: Response) {
        const { userId } = req.payload

        const posts = await this.userService.getUserPosts(parseInt(userId))

        if (Array.isArray(posts)) {
            res.status(OK).json(posts)
        } else {
            throw new Error('Não foi possível remover o usuário.')
        }
    }
    
    @Delete('signout')
    @Middleware([JwtManager.middleware, authMiddleware])
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
    public async create(req: ISecureRequest, res: Response) {
        const user = await this.userService.add(req.body)
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
    public get(req: ISecureRequest, res: Response) {
        const { userId } = req.params
    }
    
    @Put(':userId')
    @Middleware([JwtManager.middleware, authMiddleware])
    public async update(req: ISecureRequest, res: Response) {
        const { userId } = req.params

        const updated = await this.userService.updateById(parseInt(userId), req.body)

        if (updated) {
            res.status(OK).end()
        } else {
            throw new Error('Não foi possível atualizar os dados do usuário.')
        }
    }
    
    @Delete(':userId')
    @Middleware([JwtManager.middleware, authMiddleware])
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