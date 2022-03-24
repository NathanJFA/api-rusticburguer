const Sequelize = require('sequelize')
const instance = require('../../data-base')

const columns = {
    location: {
        type: Sequelize.STRING,
        allowNull: false
    },
    snack: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../snacks/TableModelSnack'),
            key: 'id'
        }
        
    }
}

const options = {
    freezeTableName: true,
    tableName: 'images',
    timestamps: true,
    createdAt: 'createAt',
    updatedAt: 'updateAt',
}

module.exports = instance.define('image', columns, options)