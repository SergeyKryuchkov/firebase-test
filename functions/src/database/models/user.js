'use strict';
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const errors = require('../errors');

module.exports = (Sequelize, DataTypes) => {
    const User = Sequelize.define('User', {
        uuid: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        email: {
            type: DataTypes.STRING(512),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(512),
            set: function (password) {
                this.setDataValue('password', User.hashPassword(password));
            },
        },
        credits: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            field: 'created_at',
        },
        updatedAt: {
            type: DataTypes.DATE,
            field: 'updated_at',
        },
    }, {
        tableName: 'users',
        timestamps: true,
    });

    /**
     * @param {string} email
     * @param {string} password
     * @return {object} user
     */
    User.authenticate = async (email, password) => {
        const user = await User.findOne({
            where: {email: email},
            attributes: [...User.publicAttributes, 'password'],
        });
        if (!user) throw errors.NotFoundError('User not found!');
        if (!user.password) throw errors.NotAllowedError('Password not set! Please contact support.');
        if (user.password !== User.hashPassword(password)) throw errors.UnauthorizedError('Invalid credentials');
        return user;
    };

    /**
     * @param {string} password
     * @return {any} hash
     */
    User.hashPassword = (password) => {
        return crypto
            .createHmac('sha512', process.env.SALT || 'salt')
            .update(password)
            .digest('hex');
    };

    /**
     * Generate Authentication Token for user
     * @return {{type: string, expiresIn: *, accessToken: *}}
     */
    User.prototype.generateToken = async function () {
        const salt = process.env.SALT || 'salt';
        const data = {
            userId: this.uuid,
            userRole: this.userRole,
        };

        const tokenLifeTime = process.env.TOKEN_LIFE_TIME || 600000;
        return {
            type: 'Bearer',
            expiresIn: tokenLifeTime,
            accessToken: jwt.sign(data, salt, {expiresIn: tokenLifeTime}),
        };
    };


    User.publicAttributes = [
        ..._.without(_.keys(User.rawAttributes), 'createdAt', 'updatedAt', 'password'),
    ];

    return User;
};
