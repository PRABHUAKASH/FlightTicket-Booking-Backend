const express = require ('express');
const flightModule = require ("../modules/flightModule");


const router = express.Router();

router.get("/getFlights",flightModule.getFlights)
router.post("/newFlights",flightModule.newFlights);
router.put("/updateFlights/:id",flightModule.updateFlights);
router.delete("deleteFlights/:id",flightModule.deleteFlights);



module.exports = router