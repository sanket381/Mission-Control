const mongoose = require('mongoose')

const launch = {
    flightNumber : 100,
    mission: 'Keplar Exploration X ',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27 , 2030'),
    target:'Kepler-442-b',
    customers: ['ZTM','NASA'],
    upcoming: true,
    success: true
}

const launchesSchema = new mongoose.Schema({
    flightNumber:{
        type: Number,
        required:true
    } ,
    launchDate:{
        type:Date,
        required:true
    },
    mission:{
        type:String,
        required:true
    },
    rocket:{
        type:String,
        required:true
    },
    customers: [String],
    target:{
        type:String,
        required:true
    },
    upcoming:{
        type:Boolean,
        required:true
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    }
})

module.exports = mongoose.model('Launch',launchesSchema);

