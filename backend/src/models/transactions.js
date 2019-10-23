'use strict';

module.exports = (Sequelize, DataTypes) => {
    const Transaction = Sequelize.define('Transaction', {
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
        tableName: 'transactions',
        timestamps: true,
    });

    return Transaction;
};
