const mongo = require ("../connect");
const {ObjectId} = require("mongodb");


//Get Employees Data========================================================================
module.exports.getEmployees = async (req,res) => {
    try{
        const employeesDetails = await mongo.selectDB.collection("flight-employees").find().toArray();
        res.send( employeesDetails);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}

//Create Employees Data====================================================================================

module.exports.createEmployeesData = async (req,res) =>{
    try{
        const insertResponse = await mongo.selectDB.collection("flight-employees").insertOne(req.body.employees);
        res.send(insertResponse );

    }catch(err){
        console.error(err);
        res.status(500).send(err);

    }
}

//Update Employees Data =============================================================================

module.exports.updateEmployees = async (req,res) => {
    
    try{
        const id = req.params.id;
        const updateData = await mongo.selectDB.collection("flight-employees")
        .findOneAndUpdate(
            {_id:ObjectId(id)},{$set:{...req.body.employees}},{returnDocument:'after'}
        );
        res.send(updateData);
    }catch(err){
        console.error(err);
        res.status(500).send(err);

    }
   
};

//Delete Employees Data ============================================================================

module.exports.deleteEmployees = async (req,res) => {
    try{
        const id = req.params.id;
        const deleteData = await mongo.selectDB.collection("flight-employees")
        .remove({_id:ObjectId(id)});
        res.send(deleteData);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}