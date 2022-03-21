const AddressTable = require('./AddressTable')
const InvalidField = require('../../../../erros/InvalidField')
const DataNotProvided = require('../../../../erros/DataNotProvided')


class Address {
    constructor({id, street, district, city, state,  number, client, createAt, updateAt, version}){
        this.id = id
        this.street = street
        this.district = district
        this.city = city
        this.state = state
        this.number = number
        this.client = client
        this.createAt = createAt
        this.updateAt = updateAt
        this.version = version
    }
    async create(){
        this.validate()
        const result = await AddressTable.insert({
            street: this.street,
            district: this.district,
            city: this.city,
            state: this.state,
            number: this.number,
            client: this.client
        })
        this.id = result.id
        this.createAt = result.createAt
        this.updateAt = result.updateAt
        this.version = result.version
    }
    async charge(){
        const addressFound = await AddressTable.findById(this.id, this.client)
        this.street = addressFound.street
        this.district = addressFound.district
        this.city = addressFound.city
        this.state = addressFound.state
        this.number = addressFound.number
        this.client = addressFound.client
        this.createAt = addressFound.createAt
        this.updateAt = addressFound.updateAt
        this.version = addressFound.version
    }
    async update(){
        
        await AddressTable.findById(this.id, this.client)
        const fields = ['street','district','city','state','number']
        const dataForUpdate = {}

        fields.forEach((field) => {
            const value = this[field]
            if(typeof value === 'string' && value.length > 0){
                dataForUpdate[field] = value
            }if(field === 'number'){
                const value = this[field]
                if(value){
                    dataForUpdate[field] = value
                }
            }
        })
        if(Object.keys(dataForUpdate).length === 0){
            throw new DataNotProvided()
        }
        await AddressTable.update(this.id, this.client,dataForUpdate)
    }
    async delete(){
        await AddressTable.delete(this.id, this.client)
    }
    validate(){
        const fields = ['street','district','city','state','number']
        fields.forEach((field) => {
            const value = this[field]  
            if(typeof value !== 'string' || value.length === 0){
                if(!field === 'number'){
                    throw new InvalidField(field)
                }
            }
        })        
    }
}

module.exports = Address