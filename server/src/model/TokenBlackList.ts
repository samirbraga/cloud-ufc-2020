import Sequelize from 'sequelize';
import sequelize from '../postgres-db';
import { generateId } from '../postgres-db/utils';


class TokenBlacklist extends Sequelize.Model implements TokenBlackListEntity {
    public id!: number
    public token!: string
    public userId!: number
}

// Model definition
TokenBlacklist.init({
    id: { defaultValue: generateId.smallint, type: Sequelize.SMALLINT, primaryKey: true },
    token: { type: Sequelize.TEXT, allowNull: false },
    userId: {
        type: Sequelize.SMALLINT,
        field: 'user_id',
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'token_blacklist',
    tableName: 'token_blacklist'
});

export default TokenBlacklist;
