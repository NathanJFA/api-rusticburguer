const Sequelize = require('sequelize')
const instance = require('../../data-base')

const columns = {
    value: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    stateForPedido:{
        type: Sequelize.ENUM('RECEBIDO','APROVADO','REPROVADO','EM ANDAMENTO','EM TRANSPORTE','ENTREGUE'),
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
    tableName: 'pedidos',
    timestamps: true,
    createdAt: 'createAt',
    updatedAt: 'updateAt',
}

module.exports = instance.define('pedido', columns, options)