import Sequelize from 'sequelize';
import sequelize from '../db';
import { generateId } from '../db/utils';

export interface ITokenBlacklist {
    id?: number
    token: string
    type: string
    attempts: number
    code: number
}

class TokenBlacklist extends Sequelize.Model implements ITokenBlacklist {
    public id: number
    public token: string
    public type: string
    public attempts: number
    public code: number
}

// Model definition
TokenBlacklist.init({
    id: { defaultValue: generateId, type: Sequelize.INTEGER, primaryKey: true },
    token: { type: Sequelize.TEXT, allowNull: false },
    type: { type: Sequelize.TEXT, allowNull: false },
    attempts: { type: Sequelize.SMALLINT, allowNull: true },
    code: { type: Sequelize.SMALLINT, allowNull: true }
}, {
    sequelize,
    modelName: 'token_blacklist'
});

export default TokenBlacklist;
