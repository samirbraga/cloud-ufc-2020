import { Sequelize } from 'sequelize'
import config from '../config'

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    dialect: 'postgres',
    quoteIdentifiers: false,
    host: config.DB_HOST,
    port: parseInt(config.DB_PORT),
    define: {
        timestamps: false,
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_general_ci_ai'
    }
});

export default sequelize;