const Sequelize = require('sequelize');
const sequelize = require('../db');
const dbUtils = require('../db/utils');

const Users = require('./Users');
const Likes = require('./Likes');

class Posts extends Sequelize.Model {}

// Model definition
Posts.init({
    id: { defaultValue: dbUtils.generateId, type: Sequelize.SMALLINT, primaryKey: true },
    user_id: {
            type: Sequelize.SMALLINT, 
            allowNull: false, 
            references: {
                    model: Users,
                    key: 'id'
                }
            },
    publication_date: { type: Sequelize.DATE, allowNull: false},
    s3_address: { type: Sequelize.TEXT, allowNull: false },
}, {
    sequelize,
    modelName: 'posts'
});

Posts.belongsToMany(Users, {
    through: Likes,
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

});

Users.belongsToMany(Posts, {
    through: Likes,
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'

});

module.exports = Posts;
