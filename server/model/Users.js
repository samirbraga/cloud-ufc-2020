const Sequelize = require('sequelize');
const sequelize = require('../db');
const dbUtils = require('../db/utils');

class Users extends Sequelize.Model {}

// Model definition
Users.init({
    id: { defaultValue: dbUtils.generateId, type: Sequelize.SMALLINT, primaryKey: true },
    username: {type: Sequelize.TEXT, allowNull: false, unique: true},
    email: { type: Sequelize.TEXT, allowNull: false, unique: true },
    password: { type: Sequelize.TEXT, allowNull: false },
    first_name: { type: Sequelize.TEXT, allowNull: false },
    last_name: { type: Sequelize.TEXT, allowNull: false },
    birthdate: Sequelize.DATE,
    profile_img: Sequelize.TEXT
}, {
    sequelize,
    modelName: 'users'
});

module.exports = Users;
