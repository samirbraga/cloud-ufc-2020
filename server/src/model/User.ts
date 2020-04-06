import Sequelize from 'sequelize';
import sequelize from '../db';
import { generateId } from '../db/utils';

export interface IUser {
    id?: number
    username: string
    email: string
    password: string
    firsName: string
    lastName: string
    birthdate: string
    profileImg: string
}

export class User extends Sequelize.Model {
    public id: number
    public username: string
    public email: string
    public password: string
    public firsName: string
    public lastName: string
    public birthdate: string
    public profileImg: string
}

// Model definition
User.init({
    id: { defaultValue: generateId, type: Sequelize.SMALLINT, primaryKey: true },
    username: {type: Sequelize.TEXT, allowNull: false, unique: true},
    email: { type: Sequelize.TEXT, allowNull: false, unique: true },
    password: { type: Sequelize.TEXT, allowNull: false },
    firsName: { type: Sequelize.TEXT, allowNull: false },
    lastName: { type: Sequelize.TEXT, allowNull: false },
    birthdate: Sequelize.DATE,
    profileImg: Sequelize.TEXT
}, {
    sequelize,
    modelName: 'users'
});

export default User;
