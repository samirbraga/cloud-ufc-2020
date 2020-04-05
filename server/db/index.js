const Sequelize = require('sequelize');
const config = require('../config');
const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    dialect: 'postgres',
    host: config.DB_HOST,
    port: config.DB_PORT,
    define: {
        timestamps: false,
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_general_ci_ai'
    }
});

module.exports = sequelize;
