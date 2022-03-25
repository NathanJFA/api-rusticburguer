const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const config = require('config')
const NotFound = require('./erros/NotFound')
const InvalidField = require('./erros/InvalidField')
const DataNotProvided = require('./erros/DataNotProvided')
const UnsupportedValue = require('./erros/UnsupportedValue')
const SerealizerError = require('./Serealizer').SerealizerError
const acceptFormats = require('./Serealizer').acceptFormats   

app.use(bodyParser.json())

app.use((request, response, next) => {
    let requestedFormat = request.header('Accept')
    if(requestedFormat === "*/*"){
        requestedFormat = 'application/json'
    }
    if(acceptFormats.indexOf(requestedFormat) === -1){
        response.status(406)
        response.end()
        return
    }
    response.setHeader('Content-Type', requestedFormat)
    next()
})


app.use((requisicao, resposta, proximo) =>{
    resposta.set('Access-Control-Allow-Origin','*') // dominio do site ou * 
    //fetch('http://127.0.0.1:3002/api/fornecedores').then(console.log)   ->>>>> pra acessar
    proximo()
    /*
    const corpo = JSON.stringify({empresa: 'Loja de brinquedos'})
    const cabecalhos = {'Content-Type':'application/json'}
    fetch(url, { method: 'PUT', body: corpo, headers: cabecalhos}).then(console.log) 

    */
})

const routerSnack = require('./model/snacks')
app.use('/api/snacks', routerSnack)
const routerClient = require('./model/clients')
app.use('/api/clients', routerClient)
const routerPedido = require('./model/pedidos')
app.use('/api/pedidos', routerPedido)
const routerAdmin = require('./model/admins')
app.use('/api/admins', routerAdmin)


//DEFININDO ROTA V2
//----------------------------------------------------------
const routerV2 = require('./routers/rotas.v2')
const IncorretCredencial = require('./erros/IncorretCredencial')
app.use('/api/v2/clients', routerV2)
//----------------------------------------------------------

app.listen(config.get('api.port'), () => console.log('A API está funcionando!'))

app.use((erro, request, response, next) => {
    let status = 500
    if(erro instanceof NotFound){
        status = 404
    }if(erro instanceof InvalidField || erro instanceof DataNotProvided || erro instanceof IncorretCredencial){
        status = 400
    }if(erro instanceof UnsupportedValue){
        status = 406
    }
    const serealizer = new SerealizerError(
        response.getHeader('Content-Type')
    )
    response.status(status)
    console.log("Erro -> " + erro.message + " id --> " + erro.id)
    response.send(
        serealizer.serealize({
            message: erro.message,
            id: erro.idErro
        })
    )
})