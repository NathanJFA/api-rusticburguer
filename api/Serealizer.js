const UnsupportedValue = require('./erros/UnsupportedValue')
const jsontoxml = require('jsontoxml')
class Serealizer{
    json(data){
        return JSON.stringify(data)
    }
    xml(data){
        let tag = this.tagSingular
        if (Array.isArray(data)) {
            tag = this.tagPlural
            data = data.map((item) => {
                return {
                    [this.tagSingular]: item
                }
            })
        }
        return jsontoxml({[tag]:data})
    }
    serealize(data){
        if(this.contentType === 'application/json'){
            return this.json(data)
        }if(this.contentType === 'application/xml'){
            return this.xml(data)
        }
        throw new UnsupportedValue(this.contentType)
    }
     filterObject (data) {
        const newObject = {}

        this.publicFields.forEach((field) => {
            if (data.hasOwnProperty(field)) {
                newObject[field] = data[field]
            }
        })

        return newObject
    }

    filter (data) {
        if (Array.isArray(data)) {
            data = data.map(item => {
                return this.filterObject(item)
            })
        } else {
            data = this.filterObject(data)
        }

        return data
    }
}
class SerealizerClient extends Serealizer{
    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.publicFields = ['id','name','email'].concat(extraFields || [])
        this.tagSingular = 'client'
        this.tagPlural = 'clients'
    }
}
class SerealizerAddress extends Serealizer{
    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.publicFields = ['id','street','district','number'].concat(extraFields || [])
        this.tagSingular = 'address'
        this.tagPlural = 'adresses'
    }
}
class SerealizerSnack extends Serealizer{
    constructor(contentType, extraFields){
        super()
        this.contentType = contentType
        this.publicFields = ['id','name','value','description'].concat(extraFields || [])
        this.tagSingular = 'snack'
        this.tagPlural = 'snacks'
    }
}
class SerealizerError extends Serealizer {
    constructor (contentType, extraFields) {
        console.log("ConsoleSerealizerError---->>>" + contentType)
        super()
        this.contentType = contentType
        this.publicFields = [
            'id',
            'message'
        ].concat(extraFields || [])
        this.tagSingular = 'erro'
        this.tagPlural = 'error'
    }
}
module.exports = {
    Serealizer: Serealizer,
    SerealizerClient: SerealizerClient,
    SerealizerAddress: SerealizerAddress,
    SerealizerError: SerealizerError,
    SerealizerSnack: SerealizerSnack,
    acceptFormats: ['application/json','application/xml']
}