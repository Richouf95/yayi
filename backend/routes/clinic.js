const express = require('express')
const {
    getClinics,
    getClinic,
    createClinic,
    deleteClinic,
    updateClinic
} = require('../controllers/clinicController')

const router = express.Router()

// GET all Clinics
router.get('/', getClinics)

// GET a single Clinic
router.get('/:id', getClinic)

// POST a new Clinic
router.post('/', createClinic)

// DELETE a Clinic
router.delete('/:id', deleteClinic)

// Update a Clinic
router.patch('/:id', updateClinic)

module.exports = router