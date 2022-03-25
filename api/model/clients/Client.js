const ClientTable = require('./ClientTable')
const InvalidField = require('../../erros/InvalidField')
const DataNotProvided = require('../../erros/DataNotProvided')
const moment = require('moment')

class Client {
    constructor({id, name, lastname, email, date, sexo, telephone, password, createAt, updateAt, version}){
        this.id = id
        this.name = name
        this.lastname = lastname
        this.email = email
        this.date = date
        this.sexo = sexo
        this.telephone = telephone
        this.password = password
        this.createAt = createAt
        this.updateAt = updateAt
        this.version = version
    }
    
    async create(){
        this.validate()
        const result = await ClientTable.insert({
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            date: this.date,
            sexo: this.sexo,
            telephone: this.telephone,
            password: this.password
        })
        this.id = result.id
        this.createAt = result.createAt
        this.updateAt = result.updateAt
        this.version = result.version
    }
    async charge(id){
        const clientFound = await ClientTable.findById(this.id)
        this.name = clientFound.name
        this.lastname = clientFound.lastname
        this.email = clientFound.email
        this.date = clientFound.date
        this.sexo = clientFound.sexo
        this.telephone = clientFound.telephone
        this.createAt = clientFound.createAt
        this.updateAt = clientFound.updateAt
        this.version = clientFound.version
    }
    async update(){
        
        await ClientTable.findById(this.id)
        const fields = ['name','lastname','email','telephone','password']
        const dataForUpdate = {}

        fields.forEach((field) => {
            const value = this[field]
            if(typeof value === 'string' && value.length > 0){
                dataForUpdate[field] = value
            }
        }) 
        if(Object.keys(dataForUpdate).length === 0){
            throw new DataNotProvided()
        }
        await ClientTable.update(this.id, dataForUpdate)
    }
    async delete(){
        await ClientTable.delete(this.id)
    }
    validate(){
        const fields = ['name','lastname','email','sexo','password', 'telephone']
        fields.forEach((field) => {
            const value = this[field]
            if(typeof value !== 'string' || value.length === 0){
                throw new InvalidField(field)
            }
        })
        //VERIFICAR CAMPO DATA - MANUTENÇÃO
        const value = this.date
        this.date = moment(value, "DD/MM/YYYY").format();
        
    }
}

module.exports = Client