const Clinic = require('../models/clinicModel')
const mongoose = require('mongoose')

// GET all clinics
const getClinics = async (req,res) => {
    const clinic = await Clinic.find({  }).sort({createdAt: -1})

    res.status(200).json(clinic)
}

// GET a single clinic
const getClinic = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such clinic"})
    }

    const clinic = await Clinic.findById(id)

    if (!clinic) {
        return res.status(404).json({error: "No such clinic"})
    }

    res.status(200).json(clinic)
}

// POST a new clinic
const createClinic = async (req,res) => {
    const {name, adress, coordonnee} = req.body

    try {
        const clinic = await Clinic.create({name, adress, coordonnee})
        res.status(200).json(clinic)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a clinic
const deleteClinic = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such clinic"})
    }

    const clinic = await Clinic.findOneAndDelete({_id: id})

    if (!clinic) {
        return res.status(404).json({error: "No such clinic"})
    }

    res.status(200).json(clinic)
}

// Update a clinic
const updateClinic = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such clinic"})
    }

    const clinic = await Clinic.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!clinic) {
        return res.status(404).json({error: "No such clinic"})
    }

    res.status(200).json(clinic)
}

module.exports = {
    getClinics,
    getClinic,
    createClinic,
    deleteClinic,
    updateClinic
}