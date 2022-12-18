const mongo = require ('../connect');
const {ObjectId} = require ('mongodb');

// Flight Details
module.exports.getFlights = async (req,res) => {
    try{
        const flightDetails = await mongo.selectDB.collection("flights").find().toArray();
        res.send(flightDetails);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}
//Create New Fllight
module.exports.newFlights = async (req,res) => {
    try{
        const insertFlightDetails = await mongo.selectDB.collection("flights").insertOne(req.body.flights);
        res.send(insertFlightDetails);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}

//Update old in to new
module.exports.updateFlights = async (req,res) => {
    try{
        const id = req.params.id;
        const flightUpdate = await mongo.selectDB.collection("flights").findOneAndUpdate(
            {_id:ObjectId(id)},{$set:{...req.body.flights}},{returnDocument:'after'}
        );
        res.send(flightUpdate);

    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}

//Delete Old Details
module.exports.deleteFlights = async (req,res) => {
    try{
        const id = res.params.id;
        const deleteFlight = await mongo.selectDB.collection("flights").remove({_id:ObjectId(id)});
        res.send(deleteFlight);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}