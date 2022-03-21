const Sequelize = require('sequelize')
const instance = require('../../../data-base')

const columns = {
    name: {
        type: Sequelize.STRING(70),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(35),
        allowNull: false
    },
    date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    telephone: {
        type: Sequelize.STRING(11),
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(14),
        allowNull: false
    }
}

const options = {
    freezeTableName: true,
    tableName: 'clients',
    timestamps: true,
    createdAt: 'createAt',
    updatedAt: 'updateAt',
    version: 'version'
}

module.exports = instance.define('client', columns, options)

//PAREI NA CONEXÃO DA RELAÇÃO DO ENDEREÇO COM O CLIENTE