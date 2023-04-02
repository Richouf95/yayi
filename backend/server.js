require('dotenv').config()
const expess = require('express') 
const clientsRoutes = require('./routes/clients')
const clinicsRoutes = require('./routes/clinic')
const invoicesRoutes = require('./routes/invoice')
const mongoose = require('mongoose')
const cors = require('cors')

// express app
const app = expess()

// middelware
app.use(expess.json())

app.use(cors({
    origin: "http://localhost:3000"
}))

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/clients', clientsRoutes)

app.use('/api/clinic', clinicsRoutes)

app.use('/api/invoices', invoicesRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log("Connect to db & listening on port : ", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })
