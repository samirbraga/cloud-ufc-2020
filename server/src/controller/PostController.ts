import { Request, Response } from "express"
import { JwtManager, ISecureRequest } from '@overnightjs/jwt'
import { OK, CREATED, NOT_FOUND } from 'http-status-codes'
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core'
import PostService from "../service/PostService"
import authMiddleware from "./middlewares/authMiddleware"
import postAuthorityMiddleware from "./middlewares/postAuthorityMiddleware"

type PostRequestParams = {
    postId: string,
    userId: string
}

@Controller('api')
class PostController {
    private postService = PostService.getInstance()

    @Post(':userId/posts')
    @Middleware([JwtManager.middleware, authMiddleware])
    public async add(req: ISecureRequest, res: Response) {
        const { userId } = req.payload
        const post = await this.postService.add(req.body, userId)

        if (post) {
            res.status(CREATED).json(post)
        } else {
            throw new Error('Não foi possível criar o post.')
        }
    }
    
    @Put(':userId/posts/:postId')
    @Middleware([JwtManager.middleware, authMiddleware, postAuthorityMiddleware])
    public async update(req: Request<PostRequestParams>, res: Response) {
        const { postId } = req.params

        const updated = await this.postService.updateById(parseInt(postId), req.body)

        if (updated) {
            res.status(OK).end()
        } else {
            throw new Error('Nenhum post foi atualizado.')
        }
    }
    
    @Delete(':userId/posts/:postId')
    @Middleware([JwtManager.middleware, authMiddleware, postAuthorityMiddleware])
    public async remove(req: Request<PostRequestParams>, res: Response) {
        const { postId } = req.params
        const removed = await this.postService.updateById(parseInt(postId), req.body)

        if (removed) {
            res.status(OK).end()
        } else {
            throw new Error('Nenhum post foi removido.')
        }
    }
    
    @Get(':userId/posts/:postId')
    public async get(req: Request<PostRequestParams>, res: Response) {
        const { postId } = req.params
        const post = await this.postService.getById(parseInt(postId))
        
        if (post) {
            res.status(OK).json(post)
        } else {
            res.status(NOT_FOUND).end()
        }
    }
    
    @Get(':userId/posts/:postId/likes')
    public async getlikes(req: Request<PostRequestParams>, res: Response) {
        const { postId } = req.params
        const likes = await this.postService.getLikesById(parseInt(postId))

        if (Array.isArray(likes)) {
            res.status(OK).json(likes)
        } else {
            throw new Error('Não foi possível capturar os likes do post.')
        }
    }
    
    @Post(':userId/posts/:postId/likes')
    @Middleware([JwtManager.middleware, authMiddleware])
    public async like(req: ISecureRequest, res: Response) {
        const { postId, userId } = req.params
        if (req.body.like) {
            const like = await this.postService.likeById(parseInt(postId), parseInt(userId))
            
            if (like) {
                res.status(CREATED).json(like)
            } else {
                throw new Error('Não foi possível gerar o like no post.')
            }
        } else {
            const unlike = await this.postService.unlikeById(parseInt(postId), parseInt(userId))
            
            if (unlike) {
                res.sendStatus(OK)
            } else {
                throw new Error('Não foi possível completar a operação.')
            }
        }
    }
}

export default PostController
