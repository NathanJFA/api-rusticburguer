const models = [
    require('../routers/model/clients/TableModelClient'),
    require('../routers/model/clients/adresses/TableModelAddress'),
    require('../routers/model/snacks/TableModelSnack')
]
async function createTables(){
    for (let cont = 0; cont < models.length; cont++) {
        const model = models[cont]
        await model.sync().then().catch(console.log)
    }
}
createTables()