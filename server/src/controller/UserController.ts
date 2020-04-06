import { Request, Response } from 'express'
import { OK, CREATED } from 'http-status-codes'
import { JwtManager, ISecureRequest } from '@overnightjs/jwt'
import { Delete, Controller, Post, Put, Get, Middleware } from '@overnightjs/core'
import UserService from '../service/UserService'

@Controller('api/user')
class UserController {
    private userService = new UserService()

    public userPosts(req: Request, res: Response) {
        
    }
    
    @Delete('signout')
    @Middleware(JwtManager.middleware)
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
        const token = await this.userService.geneareToken(user.id)

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
            const token = await this.userService.geneareToken(userId)
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
    @Middleware(JwtManager.middleware)
    public async update(req: ISecureRequest, res: Response) {
        const { userId } = req.params
        
        const updated = await this.userService.updateById(parseInt(userId), req.body)

        if (updated) {
            res.status(OK).end()
        } else {
            throw new Error('Nenhum usuário foi atualizado.')
        }
    }
    
    @Delete(':userId')
    @Middleware(JwtManager.middleware)
    public destroy(req: ISecureRequest, res: Response) {
        const { userId } = req.params
    }
}

export default UserController