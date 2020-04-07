import expressAsyncHandler from 'express-async-handler'
import { Request, Response } from 'express'
import { OK, CREATED } from 'http-status-codes'
import { JwtManager, ISecureRequest } from '@overnightjs/jwt'
import { Delete, Controller, Post, Put, Get, Middleware, ClassWrapper } from '@overnightjs/core'
import multer from 'multer'
import multerS3 from 'multer-s3'
import UserService, { s3 } from '../service/UserService'
import authMiddleware from './middlewares/authMiddleware'

type S3MulterFile = {
    file: {
        location: string
    }
}

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET,
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        },
        acl: 'public-read'
    })
})

@Controller('api/user')
@ClassWrapper(expressAsyncHandler)
class UserController {
    private userService = UserService.getInstance()

    @Get()
    public async getAll(req: ISecureRequest, res: Response) {
        const users = await this.userService.getAll()

        if (Array.isArray(users)) {
            res.status(OK).json(users)
        } else {
            throw new Error('Não foi possível retornar os usuários.')
        }
    }

    @Get('posts')
    @Middleware([
        JwtManager.middleware,
        authMiddleware
    ])
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