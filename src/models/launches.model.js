const launchesDataBase = require('./launches.mongo')
const planets = require('./planets.mongo')
const launches = new Map()
const DEFAULT_FLIGHT_NUMBER = 100;
let flightNumberCount = 100;

const launch = {
    flightNumber : 100,
    mission: 'Keplar Exploration X ',
    rocket: 'Explorer IS1',
    launchDate: new Date('December 27 , 2030'),
    target:'Kepler-442 b',
    customers: ['ZTM','NASA'],
    upcoming: true,
    success: true
}

saveLaunch(launch)
// launches.set(launch.flightNumber,launch)

async function exitsLaunchWithId(launchId){
    return await launchesDataBase.findOne({flightNumber:launchId})
}

async function getAllLaunches(){
    return await launchesDataBase.find({})
}

async function getLatestFlightNumber() {
    const latestLaunch = await launchesDataBase.findOne().sort('-flightNumber')

    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
}

async function saveLaunch(launch) {
    try{

        const isPlanetFound = await planets.findOne({
            keplerName: launch.target,     
          })
      
          if(!isPlanetFound){
              throw new Error("Planet Not Found");
          }
      
          console.log("launch::",launch)

       await launchesDataBase.updateOne({
            flightNumber: launch.flightNumber
        },
        launch
        ,{
            upsert:true
        });
    }catch(error){
        console.log("error saveLaunch::",error)
    }
}

async function scheduleNewLaunch(launch) {
    const newFlightNumber = await getLatestFlightNumber() + 1

    const newLaunch = Object.assign(launch,{
        customers: ['ZTM','NASA'],
        upcoming: true,
        success: true,
        flightNumber: newFlightNumber
    })

    await saveLaunch(newLaunch)
}

// function addNewLaunches(record){
//     // console.log("add Launch:::",record)
//     flightNumberCount++
//     launches.set(flightNumberCount,Object.assign(record,{
//         success:true,
//         upcoming:true,
//         customers: ['Zero To mastery','NASA'],
//         flightNumber: flightNumberCount
//     }))
// }

async function abortLaunchByID(launchId){
 const aborted =  await launchesDataBase.updateOne({
    flightNumber:launchId
   },{
     upcoming: false,
     success:false
   })
   console.log("abortLaunchByID:::",aborted)
   return aborted.matchedCount === 1 && aborted.modifiedCount === 1

}

module.exports ={
    getAllLaunches,
    scheduleNewLaunch,
    exitsLaunchWithId,
    abortLaunchByID
}