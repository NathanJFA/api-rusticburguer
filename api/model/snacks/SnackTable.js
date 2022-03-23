const ModelSnack = require('./TableModelSnack')
const NotFound = require('../../erros/NotFound')

module.exports = {
    list () {
        return ModelSnack.findAll({ raw: true }
        )
    },
    insert(Snack){
        return ModelSnack.create(Snack)
    },
    async findById(id){
        const found = await ModelSnack.findOne({
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
        return ModelSnack.update(dataForUpdate,{
            where: {
                id:id
            }
        })
    },
    async delete(id){
        return ModelSnack.destroy({
            where: {
                id: id
            }
        })
    }
}