import Sequelize from 'sequelize';
import sequelize from '../postgres-db';
import { generateId } from '../postgres-db/utils';

export class User extends Sequelize.Model {
    public id!: number
    public username!: string
    public email!: string
    public password!: string
    public firstName!: string
    public lastName!: string
    public birthdate!: string
    public profilePhoto!: string
}

// Model definition
User.init({
    id: { defaultValue: generateId.smallint, type: Sequelize.SMALLINT, primaryKey: true },
    username: {type: Sequelize.TEXT, allowNull: false, unique: true},
    email: { type: Sequelize.TEXT, allowNull: false, unique: true },
    password: { type: Sequelize.TEXT, allowNull: false },
    firstName: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'firstname'
    },
    lastName: {
        type: Sequelize.TEXT,
        allowNull: false,
        field: 'lastname'
    },
    birthdate: Sequelize.DATE,
    profilePhoto: {
        type: Sequelize.TEXT,
        field: 'profile_photo'
    }
}, {
    sequelize,
    modelName: 'users',
    tableName: 'users'
});

export default User;
