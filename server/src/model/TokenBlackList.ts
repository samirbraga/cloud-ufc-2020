import Sequelize from 'sequelize';
import sequelize from '../db';
import { generateId } from '../db/utils';


class TokenBlacklist extends Sequelize.Model implements TokenBlackListEntity {
    public id: number
    public token: string
    public userId: number
}

// Model definition
TokenBlacklist.init({
    id: { defaultValue: generateId, type: Sequelize.INTEGER, primaryKey: true },
    token: { type: Sequelize.TEXT, allowNull: false },
    userId: { type: Sequelize.SMALLINT, allowNull: false }
}, {
    sequelize,
    modelName: 'token_blacklist'
});

export default TokenBlacklist;
