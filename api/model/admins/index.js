const router = require('express').Router()
const AdminTable = require('./AdminTable')
const Admin = require('./Admin')
const SerealizerAdmin = require('../../Serealizer').SerealizerAdmin
const NotFound = require('../../erros/NotFound')



router.options('/', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/', async (request, response) => {
    const results = await AdminTable.list()
    response.status(200)
    const serealizer = new SerealizerAdmin(response.getHeader('Content-Type'))
    response.send(
        serealizer.serealize(results)
    )
})

router.post('/', async (request, response, next) => {
    try{
        const receivedData = request.body
        const admin = new Admin(receivedData)
        await admin.create()
        response.status(201)
        const serealizer = new SerealizerAdmin(response.getHeader('Content-Type'))
        const timestamp = (new Date(admin.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.set('Location', `/api/admins/${admin.id}`)
        response.send(
            serealizer.serealize(admin)
        )
    }
    catch(erro){
        next(erro)
    }
    
})
router.options('/:idAdmin', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, HEAD')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/:idAdmin', async (request, response, next) => {
    try{
        const id = request.params.idAdmin
        const admin = new Admin({id})
        await admin.charge()
        response.status(200)
        const serealizer = new SerealizerAdmin(response.getHeader('Content-Type'),['password'])
        const timestamp = (new Date(admin.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.send(
            serealizer.serealize(admin)
        )
    }catch(erro){
        next(erro)
    }
})
router.put('/:idAdmin', async (request, response, next) => {
    try{
        const id = request.params.idAdmin
        const receivedData = request.body
        const data = Object.assign({}, receivedData, {id: id})
        const admin = new Admin(data)
        await admin.update()
        const timestamp = (new Date(admin.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }

})
router.delete('/:idAdmin', async (request, response, next) => {
    try{
        const id = request.params.idAdmin
        const admin = new Admin({id})
        await admin.charge()
        await admin.delete()
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }
})
router.head('/:idAdmin', async (request, response, next) => {
    try {
        const data = {
            id: request.params.id,
        }
        const admin = new Admin(data)
        await admin.charge()
        const timestamp = (new Date(admin.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(200)
        response.end()
    } catch (erro) {
        next(erro)
    }
})

module.exports = router