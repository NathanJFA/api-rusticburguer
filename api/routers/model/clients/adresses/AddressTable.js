const Model = require('./TableModelAddress')
const NotFound = require('../../../../erros/NotFound')

module.exports = {
    list (idClient) {
        return Model.findAll({ 
            where:{
                client: idClient
            },
            raw: true })
    },
    insert(Address){
        return Model.create(Address)
    },
    async findById(idAddress, idClient){
        const found = await Model.findOne({
            where: {
                client: idClient,
                id: idAddress
            }
        })
        if( !found){
            throw new NotFound()
        }
        return found
    },
    async update(id, idClient, dataForUpdate){
        return Model.update(dataForUpdate,{
            where: {
                id:id,
                client: idClient
            }
        })
    },
    async delete(id, idClient){
        return Model.destroy({
            where: {
                id: id,
                client: idClient
            }
        })
    }
}