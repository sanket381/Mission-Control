const express = require('express')
const cors = require('cors')
const path = require('path')
const planetRouters = require('./routes/planets/planets.router')
const launchesRouters = require('./routes/launches/launches.router')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'..','public')))
app.use('/planets',planetRouters)
app.use('/launches',launchesRouters)

app.get('/*',(req,res)=>{
    res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports = app;