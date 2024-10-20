const {getAllLaunches,scheduleNewLaunch,exitsLaunchWithId,abortLaunchByID} = require('../../models/launches.model')


async function httpGetAllLaunches(req,res){
    return res.status(200).json( await getAllLaunches())
}

async function httpAddLaunches(req,res){
    let launch = req.body

    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(401).json(
            {
                error: "Missing Required Launch Details"
            }
        )
    }

    launch.launchDate = new Date(launch.launchDate)

    if(isNaN(launch.launchDate)){
        return res.status(401).json(
            {
                error: "Invalid Launch Date"
            }
        )
    }
    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)
}

async function httpAbortLaunch(req,res){
    const launchId = Number(req.params.id)

    const isFound = await exitsLaunchWithId(launchId)
    if(!isFound){
    return res.status(401).json({
        error:"Launch Not Found"
    })
     }

     let aborted = await abortLaunchByID(launchId)

     if(!aborted){
        return res.status(400).json({
            error:'launch Not Aborted'
        })
     }

     console.log("aborted:::",aborted)
     return res.status(200).json(aborted)

}

module.exports = {
    httpGetAllLaunches,
    httpAddLaunches,
    httpAbortLaunch
}

