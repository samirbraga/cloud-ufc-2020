const Sequelize = require('sequelize');
const sequelize = require('../db');
const dbUtils = require('../db/utils');

class TokenBlacklist extends Sequelize.Model { }

// Model definition
TokenBlacklist.init({
    id: { defaultValue: dbUtils.generateId, type: Sequelize.INTEGER, primaryKey: true },
    token: { type: Sequelize.TEXT, allowNull: false },
    type: { type: Sequelize.TEXT, allowNull: false },
    attempts: { type: Sequelize.SMALLINT, allowNull: true },
    code: { type: Sequelize.SMALLINT, allowNull: true }
}, {
    sequelize,
    modelName: 'token_blacklist'
});

module.exports = TokenBlacklist;
