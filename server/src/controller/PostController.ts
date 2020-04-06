import { Request, Response } from "express"
import { JwtManager, ISecureRequest } from '@overnightjs/jwt'
import { OK, CREATED, NOT_FOUND } from 'http-status-codes'
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core'
import PostService from "../service/PostService"

type PostRequestParams = {
    postId: string
}

@Controller('api/:userId/posts')
class PostController {
    private postService = new PostService()

    @Post()
    public async add(req: Request, res: Response) {
        const post = await this.postService.add(req.body)

        if (post) {
            res.status(CREATED).json(post)
        } else {
            throw new Error('Não foi possível criar o post.')
        }
    }
    
    @Put(':postId')
    public async update(req: Request<PostRequestParams>, res: Response) {
        const { postId } = req.params

        const updated = await this.postService.updateById(parseInt(postId), req.body)

        if (updated) {
            res.status(OK).end()
        } else {
            throw new Error('Nenhum post foi atualizado.')
        }
    }
    
    @Delete(':postId')
    public async remove(req: Request<PostRequestParams>, res: Response) {
        const { postId } = req.params
        const removed = await this.postService.updateById(parseInt(postId), req.body)

        if (removed) {
            res.status(OK).end()
        } else {
            throw new Error('Nenhum post foi removido.')
        }
    }
    
    @Get(':postId')
    public async get(req: Request<PostRequestParams>, res: Response) {
        const { postId } = req.params
        const post = await this.postService.getById(parseInt(postId))
        
        if (post) {
            res.status(OK).json(post)
        } else {
            res.status(NOT_FOUND).end()
        }
    }
    
    @Get(':postId/likes')
    public async getlikes(req: Request<PostRequestParams>, res: Response) {
        const { postId } = req.params
        const likes = await this.postService.getLikesById(parseInt(postId))

        if (Array.isArray(likes)) {
            res.status(OK).json(likes)
        } else {
            throw new Error('Não foi possível capturar os likes do post.')
        }
    }
    
    @Post(':postId/likes')
    @Middleware(JwtManager.middleware)
    public async like(req: ISecureRequest, res: Response) {
        const { postId } = req.params
        const { userId } = req.payload
        const like = await this.postService.likeById(parseInt(postId), userId)
        
        if (like) {
            res.status(CREATED).json(like)
        } else {
            throw new Error('Não foi possível gerar o like no post.')
        }
    }
}

export default PostController
