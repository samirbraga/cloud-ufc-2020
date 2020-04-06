import Sequelize from 'sequelize';
import sequelize from '../db';
import { generateId } from '../db/utils';
import User from './User';
import Like from './Like';

export interface IPost {
    id?: number
    userId: number
    publicationDate: string
    s3Address: string
}

class Post extends Sequelize.Model implements IPost {
    public id: number
    public userId: number
    public publicationDate: string
    public s3Address: string
}

// Model definition
Post.init({
    id: { defaultValue: generateId, type: Sequelize.SMALLINT, primaryKey: true },
    userId: {
        type: Sequelize.SMALLINT, 
        allowNull: false, 
        references: {
            model: User,
            key: 'id'
        }
    },
    publicationDate: { type: Sequelize.DATE, allowNull: false},
    s3Address: { type: Sequelize.TEXT, allowNull: false }
}, {
    sequelize,
    modelName: 'posts'
});

Post.belongsToMany(User, {
    through: Like,
    foreignKey: 'postId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

User.belongsToMany(Post, {
    through: Like,
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

export default Post;