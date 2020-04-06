import { Application } from 'express'
import feedRouter from './feed'
import userRouter from './user'
import postRouter from './post'

export default (app: Application) => {
    app.use('/user', userRouter)
    app.use('/post', postRouter)
    app.use('/feed', feedRouter)
}