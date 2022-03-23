const SnackTable = require('./SnackTable')
const InvalidField = require('../../erros/InvalidField')
const DataNotProvided = require('../../erros/DataNotProvided')

class Snack {
    constructor({id, name, value, description, createAt, updateAt, version}){
        this.id = id
        this.name = name
        this.value = value
        this.description = description
        this.createAt = createAt
        this.updateAt = updateAt
        this.version = version
    }
    async create(){
        this.validate()
        const result = await SnackTable.insert({
            name: this.name,
            value: this.value,
            description: this.description
        })
        this.id = result.id
        this.createAt = result.createAt
        this.updateAt = result.updateAt
        this.version = result.version
    }
    async charge(id){
        const snackFound = await SnackTable.findById(this.id)
        this.name = snackFound.name
        this.value = snackFound.value
        this.description = snackFound.description
        this.createAt = snackFound.createAt
        this.updateAt = snackFound.updateAt
        this.version = snackFound.version
    }
    async update(){
        
        await SnackTable.findById(this.id)
        const fields = ['name','value','description']
        const dataForUpdate = {}
        fields.forEach((field) => {
            const value = this[field]
            //CONSERTAR A VALIDAÇÃO DO CAMPO
            if((typeof value === 'string' && value.length > 0 ) || (typeof value === 'float' && value > 0)){
                dataForUpdate[field] = value
            }
        })
        if(Object.keys(dataForUpdate).length === 0){
            throw new DataNotProvided()
        }
        await SnackTable.update(this.id, dataForUpdate)
    }
    async delete(){
        await SnackTable.delete(this.id)
    }
    validate(){
        const fields = ['name','value', 'description']
        if(typeof this['name']  !== 'string'){
            throw new InvalidField('name')
        }if(typeof this['value'] !== 'number'){
            throw new InvalidField('value')
        }if(typeof this['description'] !== 'string'){
            throw new InvalidField('descriptions')
        }
    }
}

module.exports = Snack