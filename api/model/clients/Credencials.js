const clientTable = require("./ClientTable")

class Credencials{
    constructor({email, password}){
        this.email = email
        this.password = password
    }
    async login(){
        return await clientTable.login(this.email, this.password)
    }
}
module.exports = Credencials