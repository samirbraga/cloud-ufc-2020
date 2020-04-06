import { Router } from 'express';
import FeedController from '../controller/FeedController';

const feedController = new FeedController()

const feedRouter = Router();

// CRUD in data routes 
feedRouter.get('/feed', feedController.get);
feedRouter.get('/feed?startDate=<date>&endDate=<date>', feedController.getFeedDate)

export default feedRouter;