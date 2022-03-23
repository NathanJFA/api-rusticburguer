const ModelAdmin = require('./TableModelAdmin')
const NotFound = require('../../erros/NotFound')

module.exports = {
    list () {
        return ModelAdmin.findAll({ raw: true }
        )
    },
    insert(admin){
        return ModelAdmin.create(admin)
    },
    async findById(id){
        const found = await ModelAdmin.findOne({
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
        return ModelAdmin.update(dataForUpdate,{
            where: {
                id:id
            }
        })
    },
    async delete(id){
        return ModelAdmin.destroy({
            where: {
                id: id
            }
        })
    }
}