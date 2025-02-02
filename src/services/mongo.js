const mongoose = require('mongoose')
const MONGO_URL = process.env.MONGO_URL


mongoose.connection.once('open', () => {
    console.log("Mongo DB Connection Ready")
})


mongoose.connection.on('error', (err) => {
    console.log(" connect failed  err::", err)
})

async function mongoConnect(){
    await mongoose.connect(MONGO_URL, {
    })
}

module.exports = {
    mongoConnect
}