const router = require('express').Router()
const PedidoTable = require('./PedidoTable')
const Pedido = require('./Pedido')
const SerealizerPedido = require('../../Serealizer').SerealizerPedido
const NotFound = require('../../erros/NotFound')

router.options('/', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, POST')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/', async (request, response) => {
    const results = await PedidoTable.list()
    response.status(200)
    const serealizer = new SerealizerPedido(response.getHeader('Content-Type'))
    response.send(
        serealizer.serealize(results)
    )
})

router.post('/', async (request, response, next) => {
    try{
        const receivedData = request.body
        const pedido = new Pedido(receivedData)
        await pedido.create()
        response.status(201)
        const serealizer = new SerealizerPedido(response.getHeader('Content-Type'))
        const timestamp = (new Date(pedido.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.set('Location', `/api/pedidos/${pedido.id}`)
        response.send(
            serealizer.serealize(pedido)
        )
    }
    catch(erro){
        next(erro)
    }
    
})
router.options('/:idPedido', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET, PUT, DELETE, HEAD')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/:idPedido', async (request, response, next) => {
    try{
        const id = request.params.idPedido
        const pedido = new Pedido({id})
        await pedido.charge()
        response.status(200)
        const serealizer = new SerealizerPedido(response.getHeader('Content-Type'))
        const timestamp = (new Date(pedido.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.send(
            serealizer.serealize(pedido)
        )
    }catch(erro){
        next(erro)
    }
})
router.put('/:idPedido', async (request, response, next) => {
    try{
        const id = request.params.idPedido
        const receivedData = request.body
        const data = Object.assign({}, receivedData, {id: id})
        const pedido = new Pedido(data)
        await pedido.update()
        const timestamp = (new Date(pedido.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }

})
router.delete('/:idPedido', async (request, response, next) => {
    try{
        const id = request.params.idPedido
        const pedido = new Pedido({id})
        await pedido.charge()
        await pedido.delete()
        response.status(204)
        response.end()
    }catch(erro){
        next(erro)
    }
})
router.head('/:idPedido', async (request, response, next) => {
    try {
        const data = {
            id: request.params.id,
        }
    
        const pedido = new Pedido(data)
        await pedido.charge()
        const timestamp = (new Date(pedido.updateAt)).getTime()
        response.set('Last-Modified', timestamp)
        response.status(200)
        response.end()
    } catch (erro) {
        next(erro)
    }
})


module.exports = router