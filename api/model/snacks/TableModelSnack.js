const Sequelize = require('sequelize')
const instance = require('../../data-base')

const columns = {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'snacks',
    timestamps: true,
    createdAt: 'createAt',
    updatedAt: 'updateAt',
    version: 'version'
}

module.exports = instance.define('snack', columns, options)