class InvalidField extends Error{
    constructor(field){
        const message = `O campo '${field}' está inválido`
        super(message)
        this.name='InvalidField'
        this.idErro=1
    }
}
module.exports = InvalidField