import Sequelize from 'sequelize';
import sequelize from '../db';
import { generateId } from '../db/utils';

export class User extends Sequelize.Model {
    public id: number
    public username: string
    public email: string
    public password: string
    public firstName: string
    public lastName: string
    public birthdate: string
    public profilePhoto: string
}

// Model definition
User.init({
    id: { defaultValue: generateId, type: Sequelize.SMALLINT, primaryKey: true },
    username: {type: Sequelize.TEXT, allowNull: false, unique: true},
    email: { type: Sequelize.TEXT, allowNull: false, unique: true },
    password: { type: Sequelize.TEXT, allowNull: false },
    firstName: { type: Sequelize.TEXT, allowNull: false },
    lastName: { type: Sequelize.TEXT, allowNull: false },
    birthdate: Sequelize.DATE,
    profilePhoto: Sequelize.TEXT
}, {
    sequelize,
    modelName: 'users'
});

export default User;
