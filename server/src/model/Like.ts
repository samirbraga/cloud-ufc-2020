import Sequelize from 'sequelize'
import sequelize from '../postgres-db'
import { generateId } from '../postgres-db/utils'
import User from './User'
import Post from './Post'

class Like extends Sequelize.Model implements LikeEntity {
    public id: number
    public userId: number
    public postId: number
}

// Model definition
Like.init({
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
    postId: {
        type: Sequelize.SMALLINT,
        allowNull: false,
        field: 'post_id',
        references: {
            model: Post,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'likes',
    tableName: 'likes'
})

export default Like
