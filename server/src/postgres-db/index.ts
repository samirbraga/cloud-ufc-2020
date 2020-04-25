import { Sequelize } from 'sequelize'
import config from '../config'

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    dialect: 'postgres',
    quoteIdentifiers: false,
    host: `/cloudsql/{instance}`,
    dialectOptions: {
        socketPath: `/cloudsql/{instance}`
    },
    define: {
        timestamps: false,
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_general_ci_ai',
    }
});

export default sequelize;