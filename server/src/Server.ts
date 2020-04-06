
import bodyParser from 'body-parser';
import { INTERNAL_SERVER_ERROR } from 'http-status-codes'
import { Server } from '@overnightjs/core'
import { Logger } from '@overnightjs/logger'
import { Request, Response } from 'express'
import UserController from './controller/UserController'
import PostController from './controller/PostController'
import FeedController from './controller/FeedController';

class AppServer extends Server {
    private readonly SERVER_STARTED = 'Server started on port: '

    constructor() {
        super(true);
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: true}))
        this.app.use((_, res, next) => {
            res.setHeader("Access-Control-Allow-Origin", "*")
            res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
            res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Referer, User-Agent, x-signup-token, x-access-token, x-recover-token")
            next()
        })
        
        this.setupControllers();
        this.app.use((error: Error, req: Request, res: Response, next) => {
            Logger.Err(error.toString())
            res.status(INTERNAL_SERVER_ERROR).json({
                status: 'error',
                message: error.message
            })
        })
    }

    private setupControllers(): void {
        super.addControllers([
            new UserController(),
            new PostController(),
            new FeedController()
        ])
    }

    public start(port: number): void {
        this.app.get('*', (req, res) => {
            res.send(this.SERVER_STARTED + port)
        })
        
        this.app.listen(port, () => {
            Logger.Imp(this.SERVER_STARTED + port)
        })
    }
}

export default AppServer;