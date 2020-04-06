import { Request, Response } from "express"
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core'

@Controller('api/:userId/posts')
class PostController {
    @Post()
    public add(req: Request, res: Response) {
    
    }
    
    @Put(':postId')
    public update(req: Request, res: Response) {
    
    }
    
    @Delete(':postId')
    public remove(req: Request, res: Response) {
    
    }
    
    @Get(':postId')
    public get(req: Request, res: Response) {
    
    }
    
    @Get(':postId/likes')
    public getlikes(req: Request, res: Response) {
    
    }
    
    @Post(':postId/likes')
    public like(req: Request, res: Response) {
    
    }
}

export default PostController
