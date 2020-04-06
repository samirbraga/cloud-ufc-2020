import Sequelize from 'sequelize'
import sequelize from '../db'
import { generateId } from '../db/utils'
import User from './User'
import Post from './Post'

class Like extends Sequelize.Model implements LikeEntity {
    public id: number
    public userId: number
    public postId: number
}

// Model definition
Like.init({
    id: { defaultValue: generateId, type: Sequelize.INTEGER, primaryKey: true },
    userId: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        references: {
            model: User,
            key: 'id'
        }
    },
    postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Post,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'likes'
})

export default Like
