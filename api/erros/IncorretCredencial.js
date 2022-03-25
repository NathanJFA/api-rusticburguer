class IncorretCredencial extends Error{
    constructor(){
        super("Email ou senha incorrreta")
        this.name='IncorretCredencial'
        this.idErro=7
    }
}
module.exports = IncorretCredencial