const Model = require('./TableModelClient')
const NotFound = require('../../erros/NotFound')
const IncorretCredencial = require('../../erros/IncorretCredencial')

module.exports = {
    list () {
        return Model.findAll({ raw: true })
    },
    insert(Client){
        return Model.create(Client)
    },
    async findById(id){
        const found = await Model.findOne({
            where: {
                id: id
            }
        })
        if( !found){
            throw new NotFound()
        }
        return found
    },
    async login(email, password){
        const found = await Model.findOne({
            where: {
                email: email,
                password: password
            },
            raw: true
        })
        if(!found){
            throw new IncorretCredencial()
        }
        
        return found
    },
    async update(id, dataForUpdate){
        return Model.update(dataForUpdate,{
            where: {
                id:id
            }
        })
    },
    async delete(id){
        return Model.destroy({
            where: {
                id: id
            }
        })
    }
}