const Sequelize = require('sequelize');
const sequelize = require('../db');
const dbUtils = require('../db/utils');

const Users = require('./Users');
const Posts = require('./Posts');

class Likes extends Sequelize.Model {}

// Model definition
Likes.init({
    id: { defaultValue: dbUtils.generateId, type: Sequelize.INTEGER, primaryKey: true },
    user_id: {
            type: Sequelize.INTEGER, 
            allowNull: false, 
            references: {
                    model: Users,
                    key: 'id'
                }
            },
    post_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Posts,
            key: 'id'
        }
    },
}, {
    sequelize,
    modelName: 'likes'
});

module.exports = Likes;
