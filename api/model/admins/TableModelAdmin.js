const Sequelize = require('sequelize')
const instance = require('../../data-base')

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'admins',
    timestamps: true,
    createdAt: 'createAt',
    updatedAt: 'updateAt',
}

module.exports = instance.define('admin', columns, options)