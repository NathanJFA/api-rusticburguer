const Sequelize = require('sequelize')
const instance = require('../../data-base')

const columns = {
    street: {
        type: Sequelize.STRING(70),
        allowNull: false
    },
    district: {
        type: Sequelize.STRING(35),
        allowNull: false
    },
    city:{
        type: Sequelize.STRING(40),
        allowNull: false
    },
    state:{
        type: Sequelize.ENUM('PB','RN','SP','PA','PR','RS','PE','AL','AM','MG','AC','AP','BA','CE','DF','ES','GO','MA','MT','MS','PI','RR','RO','RJ','TO','SE'),
        allowNull: false
    },
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    client:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: require('../clients/TableModelClient'),
            key: 'id'
        }
    }
}

const options = {
    freezeTableName: true,
    tableName: 'adresses',
    timestamps: true,
    createdAt: 'createAt',
    updatedAt: 'updateAt',
    version: 'version'
}

module.exports = instance.define('address', columns, options)