const http = require('http')
require('dotenv').config();
const { mongoConnect } = require('./services/mongo')
const app = require('./app')
const PORT = process.env.PORT || 8080;
const { loadPlanetsData } = require('./models/planets.model')

const server = http.createServer(app)

async function startServer() {

    await mongoConnect()

    await loadPlanetsData()

    server.listen(PORT, () => {
        console.log(`listening on port ${PORT}`)
    })
}

startServer()


