const expess = require('express')
const {
    getClients,
    getClient,
    createClient,
    deleteClient,
    updateClient
} = require('../controllers/clientController')

const router = expess.Router()

// GET all clients
router.get('/', getClients)

// GET a single client
router.get('/:id', getClient)

// POST a new client
router.post('/', createClient)

// DELETE a client
router.delete('/:id', deleteClient)

// Update a client
router.patch('/:id', updateClient)

module.exports = router