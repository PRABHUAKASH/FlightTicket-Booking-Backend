const express = require ("express");
const cors = require ("cors");
const registerRouter = require('./router/registerRouter');
const flightRouter = require('./router/flightRouter');
const ticketBookingRouter = require('./router/ticketBookingRouter');
const employeeRouter = require('./router/employeesRouter');
const auth = require("./modules/authModule");
const dotenv = require ("dotenv");
const mongo = require('./connect');


dotenv.config();
mongo.connect();
const app = express();
app.use(cors());

app.use(express.json());

app.use("/register",registerRouter);


app.use("/ticket",ticketBookingRouter);
app.use("/",auth.authenticateUser);
app.use("/flights",flightRouter);


app.use("/employees",employeeRouter);




app.listen(process.env.PORT);