const http = require('http')
require('dotenv').config();

const app = require('./app')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 8080;

const { loadPlanetsData } = require('./models/planets.model')

const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app)

mongoose.connection.once('open', () => {
    console.log("Mongo DB Connection Ready")
})


mongoose.connection.on('error', (err) => {
    console.log(" connect failed  err::", err)
})

async function startServer() {
    await mongoose.connect(MONGO_URL, {
    })

    await loadPlanetsData()

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

startServer()


