const Invoice = require('../models/invoiceModel')
const mongoose = require('mongoose')

// GET all invoices
const getInvoices = async (req,res) => {
    const invoice = await Invoice.find({  }).sort({createdAt: -1})

    res.status(200).json(invoice)
}

// GET a single invoice
const getInvoice = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such invoice"})
    }

    const invoice = await Invoice.findById(id)

    if (!invoice) {
        return res.status(404).json({error: "No such invoice"})
    }

    res.status(200).json(invoice)
}

// POST a new invoice
const createInvoice = async (req,res) => {
    const {clinicId, clientId, id, dateEmission, dateEcheance, invoiceItems, montantTotal, reglement, balance, solder, clinic:{clinicName, clinicAdress, coordonnee}, client:{clientName, clientAdress, tel, email, company, bank:{bankName, bankCountry, bankCoordonnee,}}, salesperson, salespersonComment, note} = req.body

    try {
        const invoice =  await Invoice.create({clinicId, clientId, id, dateEmission, dateEcheance, invoiceItems, montantTotal, reglement, balance, solder, clinic:{clinicName, clinicAdress, coordonnee}, client:{clientName, clientAdress, tel, email, company, bank:{bankName, bankCountry, bankCoordonnee}}, salesperson, salespersonComment, note})
        res.status(200).json(invoice)
    } catch(err) {
        res.status(400).json({error: err.message})
    }
}

// DELETE a invoice
const deleteInvoice = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such invoice"})
    }

    const invoice = await Invoice.findOneAndDelete({_id: id})

    if (!invoice) {
        return res.status(404).json({error: "No such invoice"})
    }

    res.status(200).json(invoice)
}

// Update a invoice
const updateInvoice = async (req,res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such invoice"})
    }

    const invoice = await Invoice.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!invoice) {
        return res.status(404).json({error: "No such invoice"})
    }

    res.status(200).json(invoice)
}

module.exports = {
    getInvoices,
    getInvoice,
    createInvoice,
    deleteInvoice,
    updateInvoice
}