import { Router } from 'express';
import PostController from '../controller/post';

const postController = new PostController()
const postRouter = Router();

postRouter.post('/:userId/posts', postController.add)
postRouter.put('/:userId/posts/:postId', postController.update)
postRouter.delete('/:userId/posts/:postId', postController.remove)
postRouter.get('/:userId/posts/:postId', postController.get)
postRouter.get('/:userId/posts/:postId/likes', postController.getlikes)
postRouter.post('/:userId/posts/:postId/likes', postController.like)

export default postRouter;