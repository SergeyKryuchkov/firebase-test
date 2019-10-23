'use strict';

module.exports = {
    up: async (Sequelize, DataTypes) => {
        await Sequelize.createTable('users', {
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
        });

        await Sequelize.createTable('transactions', {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            sender: {
                type: DataTypes.UUID,
                field: 'sender',
            },
            recipient: {
                type: DataTypes.UUID,
                field: 'recipient',
            },
            value: {
                type: DataTypes.INTEGER,
                field: 'value',
            },
            createdAt: {
                type: DataTypes.DATE,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                field: 'updated_at',
            },
        });
    },

    down: async (Sequelize, DataTypes) => {
        await Sequelize.dropTable('examples');
        await Sequelize.dropTable('transactions');
    }
};
