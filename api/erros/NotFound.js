class NotFound extends Error{
    constructor(){
        super("Não encontrado!!")
        this.name = 'NotFound'
        this.idErro = 0
    }
}
module.exports = NotFound