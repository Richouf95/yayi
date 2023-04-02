const mongoose = require('mongoose')

const Schema = mongoose.Schema

const invoiceSchema = new Schema({
    clinicId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    dateEmission: {
        type: Date,
        required: true
    },
    dateEcheance: {
        type: Date,
        required: true
    },
    invoiceItems: {
        type: Array
    },
    montantTotal: {
        type: Number,
        required: true
    },
    reglement: {
        type: Array
    },
    balance: {
        type: Number,
        required: true
    },
    solder: {
        type: Boolean,
        required: true
    },
    clinic: {
        clinicName: {
            type: String,
            required: true
        },
        clinicAdress: {
            type: String,
            required: true
        },
        coordonnee:{
            type: String,
            required: true
        }
    },
    client: {
        clientName: {
            type: String,
            required: true
        },
        clientAdress: {
            type: String,
            required: true
        },
        tel: {
            type: String,
            required: true
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
                type: String,
                required: true
            },
            bankCountry: {
                type: String,
                required: true
            },
            bankCoordonnee: {
                type: String,
                required: true
            }
        }
    },
    salesperson: {
        type: String
    },
    salespersonComment: {
        type: String
    },
    note: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model('Invoices', invoiceSchema)