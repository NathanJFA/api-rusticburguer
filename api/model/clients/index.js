const router = require('express').Router()
const Credencials = require('./Credencials')
const ClientTable = require('./ClientTable')
const Client = require('./Client')
const SerealizerClient = require('../../Serealizer').SerealizerClient
const NotFound = require('../../erros/NotFound')

router.options('/', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/', async (request, response) => {
    const results = await ClientTable.list()
    response.status(200)
    const serealizer = new SerealizerClient(response.getHeader('Content-Type'))
    response.send(
        serealizer.serealize(results)
    )
})

router.post('/', async (request, response, next) => {
    try{
        const receivedData = request.body
        const client = new Client(receivedData)
        await client.create()
        response.set('ETag', client.version)
        const timestamp = (new Date(client.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.set('Location', `/api/clients/${client.id}`)
        response.status(201)
        const serealizer = new SerealizerClient(response.getHeader('Content-Type'))
        response.send(
            serealizer.serealize(client)
        )
    }
    catch(erro){
        next(erro)
    }
    
})
router.post('/login', async(request, response, next) => {
    try{
        const body = request.body

        const credencials = new Credencials(body)
        const client = await credencials.login()
        response.status(200)
        response.send(client)
    }catch(erro){
        next(erro)
    }
    
})

router.options('/:idClient', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET,PUT, DELETE, HEAD')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/:idClient', async (request, response, next) => {
    try{
        const id = request.params.idClient
        const client = new Client({id})
        await client.charge()
        response.set('ETag', client.version)
        const timestamp = (new Date(client.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(200)
        const serealizer = new SerealizerClient(response.getHeader('Content-Type'),/* alterar para ['email','dataCriacao','dataAtualizacao','versao']*/)
        response.send(
            serealizer.serealize(client)
        )
    }catch(erro){
        next(erro)
    }
})

router.put('/:idClient', async (request, response, next) => {
    try{
        const id = request.params.idClient
        console.log(id)
        const receivedData = request.body
        const data = Object.assign({}, receivedData, {id: id})
        const client = new Client(data)
        await client.update()
        response.set('ETag', client.version)
        const timestamp = (new Date(client.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }

})
router.delete('/:idClient', async (request, response, next) => {
    try{
        const id = request.params.idClient
        const client = new Client({id})
        await client.charge()
        await client.delete()
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }
})
router.head('/:idClient', async (request, response, next) => {
    try {
        const data = {
            id: request.params.id,
        }
    
        const client = new Client(data)
        await client.charge()
        response.set('ETag', client.version)
        const timestamp = (new Date(client.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(200)
        response.end()
    } catch (erro) {
        next(erro)
    }
})


const checkClient = async (request, response, next) => {
    try {
        const id = request.params.idClient
        const client = new Client({ id: id })
        await client.charge()
        request.client = client
        next()
    } catch (erro) {
        next(erro)
    }
}
const routerAddress = require('../adresses')
router.use('/:idClient/address', checkClient, routerAddress)

const routerPedido = require('../pedidos')
router.use('/:idClient/pedidos', routerPedido)

module.exports = router