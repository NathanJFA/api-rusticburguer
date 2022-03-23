const PedidoTable = require('./PedidoTable')
const InvalidField = require('../../erros/InvalidField')
const DataNotProvided = require('../../erros/DataNotProvided')

class Pedido {
    constructor({id, value, description, stateForPedido, client, createAt, updateAt, version}){
        this.id = id
        this.value = value
        this.description = description
        this.stateForPedido = stateForPedido
        this.client = client
        this.createAt = createAt
        this.updateAt = updateAt
    }
    async create(){
        this.validate()
        const result = await PedidoTable.insert({
            value: this.value,
            description: this.description,
            client: this.client
        })
        this.id = result.id
        this.stateForPedido = result.stateForPedido
        this.createAt = result.createAt
        this.updateAt = result.updateAt
    }
    async charge(id){
        const pedidoFound = await PedidoTable.findById(this.id)
        this.value = pedidoFound.value
        this.description = pedidoFound.description
        this.client = pedidoFound.client
        this.stateForPedido = pedidoFound.stateForPedido
        this.createAt = pedidoFound.createAt
        this.updateAt = pedidoFound.updateAt
    }
    async update(){
        
        await PedidoTable.findById(this.id)
        const fields = ['value','description','stateForPedido']
        const dataForUpdate = {}
        if( typeof fields['value'] === 'number'){
            dataForUpdate['value'] = this['value']
        }
        if( typeof fields['description'] === 'string'){
            dataForUpdate['description'] = this['value']
        }
        if( typeof fields['stateForPedido'] === 'string'){
            const values = ['RECEBIDO','APROVADO','REPROVADO','EM ANDAMENTO','EM TTRANSPORTE','ENTREGUE']

            values.forEach( value => {    
                if(this['stateForPedido'] === value){
                    dataForUpdate['stateForPedido'] = value
                }
            })
        }
        if(Object.keys(dataForUpdate).length === 0){
            throw new DataNotProvided()
        }
        await PedidoTable.update(this.id, dataForUpdate)
    }
    async delete(){
        await PedidoTable.delete(this.id)
    }
    validate(){
        const fields = ['value','description', 'stateForPedido']
        if(typeof this['value']  !== 'number'){
            throw new InvalidField('value')
        }if(typeof this['description'] !== 'string'){
            throw new InvalidField('description')
        }if(typeof this['stateForPedido'] !== 'string'){
            throw new InvalidField('stateForPedido')
        }
    }
}

module.exports = Pedido