const router = require('express').Router({ mergeParams: true })
const AddressTable = require('./AddressTable')
const Address = require('./Address')
const SerealizerAddress = require('../../../../Serealizer').SerealizerAddress
//const NotFound = require('../../../erros/NotFound')

router.options('/', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})
router.get('/', async (request, response) => {

    const results = await AddressTable.list(request.client.id)
    response.status(200)
    const serealizer = new SerealizerAddress(response.getHeader('Content-Type'))

    response.send(
        serealizer.serealize(results)
    )
})

router.post('/', async (request, response, next) => {
    try{
        //console.log(request.client.id)
        const data = Object.assign({}, request.body, {client: request.client.id })
        const address = new Address(data)
        
        await address.create()
        response.status(201)
        const serealizer = new SerealizerAddress(response.getHeader('Content-Type'))
        response.set('ETag', address.version)
        const timestamp = (new Date(address.updateAt)).getTime()
        response.set('Location', `/api/clients/${address.client}/address/${address.id}`)
        response.set('Last-Modified', timestamp)
        response.send(
            serealizer.serealize(address)
        )
    }
    catch(erro){
        next(erro)
    }
    
})
router.options('/:idAddress', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE,HEAD')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})
router.get('/:idAddress', async (request, response, next) => {
    try{
        const id = request.params.idAddress
        const address = new Address({id,client: request.client.id})
        await address.charge()
        response.status(200)
        const serealizer = new SerealizerAddress(response.getHeader('Content-Type'),/* alterar para ['email','dataCriacao','dataAtualizacao','versao']*/)
        response.set('ETag', address.version)
        const timestamp = (new Date(address.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.send(
            serealizer.serealize(address)
        )
    }catch(erro){
        next(erro)
    }
})
router.put('/:idAddress', async (request, response, next) => {
    try{
        const data = Object.assign({}, request.body, {id: request.params.idAddress, client: request.client.id})
        const address = new Address(data)
        await address.update()
        response.set('ETag', address.version)
        const timestamp = (new Date(address.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }

})
router.delete('/:idAddress', async (request, response, next) => {
    try{
        const id = request.params.idAddress
        const address = new Address({id , client: request.client.id})
        await address.charge()
        await address.delete()
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }
})
router.head('/:idAddress', async (request, response, next) => {
    try {
        const data = {
            id: request.params.id,
            client: request.client.id
        }
    
        const address = new Address(data)
        await address.charge()
        response.set('ETag', address.version)
        const timestamp = (new Date(address.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(200)
        response.end()
    } catch (erro) {
        next(erro)
    }
})


module.exports = router