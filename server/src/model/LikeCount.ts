import mongoose, { Document } from 'mongoose';
import db from '../mongodb';

export interface ILikeCount extends LikeCountEntity, Document {}

const likeCountSchema = new mongoose.Schema({
    postId: Number,
    likesCount: Number
});

const LikeCount = db.model<ILikeCount>('likecount', likeCountSchema, 'likecount');

export default LikeCount
