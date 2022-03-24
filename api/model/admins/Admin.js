const AdminTable = require('./AdminTable')
const InvalidField = require('../../erros/InvalidField')
const DataNotProvided = require('../../erros/DataNotProvided')

class Admin {
    constructor({id, name, lastname, sexo, email, password, createAt, updateAt}){
        this.id = id
        this.name = name
        this.lastname = lastname
        this.sexo = sexo
        this.email = email
        this.password = password
        this.createAt = createAt
        this.updateAt = updateAt
    }
    async create(){
        this.validate()
        const result = await AdminTable.insert({
            name: this.name,
            lastname: this.lastname,
            sexo: this.sexo,
            email: this.email,
            password: this.password
        })
        this.id = result.id
        this.createAt = result.createAt
        this.updateAt = result.updateAt
    }
    async charge(id){
        const adminFound = await AdminTable.findById(this.id)
        this.name = adminFound.name
        this.lastname = adminFound.lastname
        this.sexo = adminFound.sexo
        this.email = adminFound.email
        this.password = adminFound.password
        this.createAt = adminFound.createAt
        this.updateAt = adminFound.updateAt
    }
    async update(){
        
        await AdminTable.findById(this.id)
        const fields = ['name','lastname','sexo','email','password']
        const dataForUpdate = {}
        fields.forEach((field) => {
            const value = this[field]
            if(typeof value === 'string' && value.length > 0 ){
                dataForUpdate[field] = value
            }
        })
        if(Object.keys(dataForUpdate).length === 0){
            throw new DataNotProvided()
        }
        await AdminTable.update(this.id, dataForUpdate)
    }
    async delete(){
        await AdminTable.delete(this.id)
    }
    validate(){
        const fields = ['name','sobrenome','sexo','email','password']
        if(typeof this['name']  !== 'string'){
            throw new InvalidField('name')
        }if(typeof this['lastname']  !== 'string'){
            throw new InvalidField('lastname')
        }if(typeof this['email'] !== 'string'){
            throw new InvalidField('email')
        }if(typeof this['password'] !== 'string'){
            throw new InvalidField('password')
        }
    }
}

module.exports = Admin