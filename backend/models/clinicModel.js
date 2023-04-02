const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ClinicSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    coordonnee:{
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Clinic', ClinicSchema)