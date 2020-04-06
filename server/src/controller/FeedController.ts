import { Request, Response } from 'express'
import { Controller, Middleware, Get, Post, Put, Delete } from '@overnightjs/core'

@Controller('api/feed')
class FeedController {
    @Get()
    public get(req: Request, res: Response) {
    
    }
    
    @Get('?startDate=<date>&endDate=<date>')
    public getFeedDate(req: Request, res: Response) {
    
    }
}

export default FeedController