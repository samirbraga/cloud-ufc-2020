import { Sequelize } from 'sequelize'
import config from '../config'

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PASS, {
    dialect: 'postgres',
    quoteIdentifiers: false,
    host: `/cloudsql/${process.env.GC_DB_ID}`,
    port: parseInt(config.DB_PORT),
    dialectOptions: {
        socketPath: `/cloudsql/${process.env.GC_DB_ID}`
    },
    define: {
        timestamps: false,
        freezeTableName: true,
        charset: 'utf8',
        collate: 'utf8_general_ci_ai',
    }
});

export default sequelize;