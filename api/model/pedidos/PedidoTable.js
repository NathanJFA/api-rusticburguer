const TableModelPedido = require('./TableModelPedido')
const NotFound = require('../../erros/NotFound')

module.exports = {
    list () {
        return TableModelPedido.findAll({ raw: true }
        )
    },
    insert(Pedido){
        return TableModelPedido.create(Pedido)
    },
    async findById(id){
        const found = await TableModelPedido.findOne({
            where: {
                id: id
            }
        })
        if( !found){
            throw new NotFound()
        }
        return found
    },
    async update(id, dataForUpdate){
        return TableModelPedido.update(dataForUpdate,{
            where: {
                id:id
            }
        })
    },
    async delete(id){
        return TableModelPedido.destroy({
            where: {
                id: id
            }
        })
    }
}