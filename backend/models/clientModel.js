const mongoose = require('mongoose')

const Schema = mongoose.Schema

const clientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String
    },
    tel: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    bank: {
        bankName: {
            type: String
        },
        bankCountry: {
            type: String
        },
        bankCoordonnee: {
            type: String
        }
    }
}, {timestamps: true})

module.exports = mongoose.model('Client', clientSchema)