const models = [
    require('../model/clients/TableModelClient'),
    require('../model/adresses/TableModelAddress'),
    require('../model/snacks/TableModelSnack'),
    require('../model/pedidos/TableModelPedido')
]
async function createTables(){
    for (let cont = 0; cont < models.length; cont++) {
        const model = models[cont]
        await model.sync().then().catch(console.log)
    }
}
createTables()