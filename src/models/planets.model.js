const { parse } = require('csv-parse');
const fs = require('fs');
const path = require('path')
const { resolve } = require('path');
const planets = require('./planets.mongo')

const habbitablePlanets = []

function isHabbitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED'
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
        && planet['koi_prad'] < 1.6;
}

 function loadPlanetsData() {
    return new Promise((resolve, reject) => {
        fs.createReadStream(path.join(__dirname,"..","..","data",'kepler_data.csv')).
            pipe(parse({
                comment: '#',
                columns: true,
            }))
            .on('data', (data) => {
                if (isHabbitablePlanet(data)) {
                    savePlanet(data)
                }
            }).on('error', (err) => {
                console.log("err::", err)
                reject()
            }).on('end', async() => {

                const planetsCount =  (await getAllPlanets()).length
                console.log(`${planetsCount} HabbitablePlanet Found`)
                resolve()
            })
    })
}

async function getAllPlanets(){
    return await planets.find({});
}

async function savePlanet(planet){
    try{
        await planets.updateOne({
            keplerName: planet.kepler_name
        },{
            keplerName: planet.kepler_name
        },{
            upsert:true
        });
    }catch(error){
        console.log("error:::",error)
    } 
}

module.exports = {
    getAllPlanets,
    loadPlanetsData
}