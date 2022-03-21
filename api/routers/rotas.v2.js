const router = require('express').Router()
const ClientTable = require('./model/clients/ClientTable')
const SerealizerClient = require('../Serealizer').SerealizerClient

router.options('/', (request, response) => {
    response.set('Access-Control-Allow-Methods', 'GET')
    response.set('Access-Control-Allow-Headers', 'Content-Type')
    response.status(204)
    response.end()
})

router.get('/', async (request, response) => {
    const results = await ClientTable.list()
    response.status(200)
    const serealizer = new SerealizerClient(
        response.getHeader('Content-Type')
    )
    response.send(
        serealizer.serialize(results)
    )
})

module.exports = router