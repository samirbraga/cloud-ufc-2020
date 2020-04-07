import Sequelize from 'sequelize';
import sequelize from '../postgres-db';
import { generateId } from '../postgres-db/utils';
import User from './User';
import Like from './Like';


class Post extends Sequelize.Model implements PostEntity {
    public id!: number
    public userId!: number
    public publicationDate!: string
    public s3Address!: string
}

// Model definition
Post.init({
    id: { defaultValue: generateId.smallint, type: Sequelize.SMALLINT, primaryKey: true },
    userId: {
        type: Sequelize.SMALLINT, 
        allowNull: false, 
        field: 'user_id',
        references: {
            model: User,
            key: 'id'
        }
    },
    publicationDate: {
        type: Sequelize.DATE,
        field: 'publication_date',
        allowNull: false
    },
    s3Address: {
        type: Sequelize.TEXT,
        field: 's3_address',
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'posts',
    tableName: 'posts'
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