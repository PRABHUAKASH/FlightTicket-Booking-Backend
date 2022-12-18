const express = require ("express");


const router = express.Router();

const ticketBookingModule = require('../modules/ticketBookingModule');

router.get("/ticketBookingDetails",ticketBookingModule .getTicketDetails);
router.post("/ticketBooking",ticketBookingModule.newTicket);
router.put("/ticketBookingWithReturn",ticketBookingModule.newTicketWithReturn);
router.delete("/deleteTicket/:id",ticketBookingModule.deleteTicket);





module.exports = router;