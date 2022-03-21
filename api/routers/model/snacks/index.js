const router = require('express').Router()
const SnackTable = require('./SnackTable')
const Snack = require('./Snack')
const SerealizerSnack = require('../../../Serealizer').SerealizerSnack
const NotFound = require('../../../erros/NotFound')

router.options('/', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/', async (request, response) => {
    const results = await SnackTable.list()
    response.status(200)
    const serealizer = new SerealizerSnack(response.getHeader('Content-Type'))
    response.send(
        serealizer.serealize(results)
    )
})

router.post('/', async (request, response, next) => {
    try{
        const receivedData = request.body
        const snack = new Snack(receivedData)
        await snack.create()
        response.status(201)
        const serealizer = new SerealizerSnack(response.getHeader('Content-Type'))
        response.set('ETag', snack.version)
        const timestamp = (new Date(snack.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.set('Location', `/api/snacks/${snack.id}`)
        response.send(
            serealizer.serealize(snack)
        )
    }
    catch(erro){
        next(erro)
    }
    
})
router.options('/:idSnack', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, HEAD')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/:idSnack', async (request, response, next) => {
    try{
        const id = request.params.idSnack
        const snack = new Snack({id})
        await snack.charge()
        response.status(200)
        const serealizer = new SerealizerSnack(response.getHeader('Content-Type'),/* alterar para snack['email','dataCriacao','dataAtualizacao','versao']*/)
        response.set('ETag', snack.version)
        const timestamp = (new Date(snack.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.send(
            serealizer.serealize(snack)
        )
    }catch(erro){
        next(erro)
    }
})
router.put('/:idSnack', async (request, response, next) => {
    try{
        const id = request.params.idSnack
        const receivedData = request.body
        const data = Object.assign({}, receivedData, {id: id})
        const snack = new Snack(data)
        await snack.update()
        response.set('ETag', snack.version)
        const timestamp = (new Date(snack.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }

})
router.delete('/:idSnack', async (request, response, next) => {
    try{
        const id = request.params.idSnack
        const snack = new Snack({id})
        await snack.charge()
        await snack.delete()
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }
})
router.head('/:idSnack', async (request, response, next) => {
    try {
        const data = {
            id: request.params.id,
        }
    
        const snack = new Snack(data)
        await snack.charge()
        response.set('ETag', snack.version)
        const timestamp = (new Date(snack.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(200)
        response.end()
    } catch (erro) {
        next(erro)
    }
})


module.exports = router