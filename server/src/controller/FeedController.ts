import expressAsyncHandler from 'express-async-handler';
import { Request, Response } from 'express'
import { Controller, Middleware, Get, Post, Put, Delete, ClassMiddleware, ClassWrapper } from '@overnightjs/core'
import { OK } from 'http-status-codes'
import PostService from '../service/PostService'

@Controller('api/feed')
@ClassWrapper(expressAsyncHandler)
class FeedController {
    private postService = PostService.getInstance()

    @Get()
    public async get(req: Request, res: Response) {
        let posts: PostEntity[]
        const {
            startDate, endDate
        } = req.query

        if (startDate && endDate) {
            posts = await this.postService.getBetweenDates(startDate, endDate)
        } else {
            posts = await this.postService.getAll()
        }

        if (Array.isArray(posts)) {
            res.status(OK).json(posts)
        } else {
            throw new Error('Não foi possível remover o usuário.')
        }
    }
}

export default FeedController