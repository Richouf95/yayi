const Client = require('../models/clientModel')
const mongoose = require('mongoose')

// GET all clients
const getClients = async (req,res) => {
    const client = await Client.find({  }).sort({createdAt: -1})

    res.status(200).json(client)
}

// GET a single client
const getClient = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such client"})
    }

    const client = await Client.findById(id)

    if (!client) {
        return res.status(404).json({error: "No such client"})
    }

    res.status(200).json(client)
}

// POST a new client
const createClient = async (req,res) => {
    const {name, adress, coordonnee, tel, email, company, bank:{bankName, bankCountry, bankCoordonnee}} = req.body
    
    // add client to db
    try{
        const client = await Client.create({name, adress, coordonnee, tel, email, company, bank:{bankName, bankCountry, bankCoordonnee}})
        res.status(200).json(client)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a client
const deleteClient = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such client"})
    }

    const client = await Client.findOneAndDelete({_id: id})

    if (!client) {
        return res.status(404).json({error: "No such client"})
    }

    res.status(200).json(client)
}

// Update a client
const updateClient = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such client"})
    }

    const client = await Client.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!client) {
        return res.status(404).json({error: "No such client"})
    }

    res.status(200).json(client)
}

module.exports = {
    getClients,
    getClient,
    createClient,
    deleteClient,
    updateClient
}