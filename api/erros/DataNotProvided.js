class DataNotProvided extends Error{
    constructor(){
        super("Dados não fornecidos")
        this.name='DataNotProvided'
        this.idErro=2
    }
}
module.exports = DataNotProvided