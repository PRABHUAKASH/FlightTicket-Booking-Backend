const express = require ('express');
const router = express.Router();
const employeeModule = require ("../modules/employeesModule");
const auth = require ("../modules/authModule");



router.get("/getEmployeeDetails",employeeModule.getEmployees);

router.post("/createEmployeeDetails",auth.authorizeUser, employeeModule.createEmployeesData);

router.put("/updateEmployeeDetails/:id",auth.authorizeUser,employeeModule.updateEmployees);

router.delete("/deleteEmployeeDetails/:id",auth.authorizeUser,employeeModule.deleteEmployees);

module.exports = router;