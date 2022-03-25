const Sequelize = require('sequelize')
const instance = require('../../data-base')

const columns = {
    name: {
        type: Sequelize.STRING(70),
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING(),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(35),
        allowNull: false
    },
    sexo: {
        type: Sequelize.ENUM('MASCULINO','FEMININO','OUTRO'),
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

