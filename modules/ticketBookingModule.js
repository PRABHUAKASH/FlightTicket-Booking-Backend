const mongo = require ("../connect");
const {ObjectId} = require("mongodb");
const bcrypt = require("bcrypt");


//Customers Booking List================================================================================
module.exports.getTicketDetails = async (req,res) => {
    try{
        const insertResponse = await mongo.selectDB.collection("ticketBooking").find().toArray();
        res.send(insertResponse);
    }catch(err){
        console.error(err);
        res.status(500).send(err);
    }
}

//Ticket Creation Only one trip =========================================================================================
module.exports.newTicket = async (req,res) => {
   
   
        const existUser =( await mongo.selectDB.collection("ticketBooking")
        .find(
            {$and:[
                {'from' : req.body.from},
                {'to' : req.body.to},
                {'depart' : req.body.depart},
                 {'name': req.body.name},
                 {'gender' : req.body.gender},
                 {'economy' : req.body.economy},
                {'payment_type' : req.body.payment_type},
                {'seat_no' : req.body.seat_no}
             ]}
        ).count() > 0);
  
  

        if( existUser){
            res.status(400).send({'msg' : 'This Seat Not Availale On This Date please Change The Seat Number'});
        }else{
            try{
               

                const insertTicketData = await mongo.selectDB.collection("ticketBooking")
                .insertOne(req.body);
                res.send(insertTicketData);
            }catch(err){
                console.error(err);
                res.status(500).send(err);
            }

        }  
    };


  


    // const isSameSeat = await bcrypt.compare(req.body.seat_no,existUser.seat_no);
    // if(!isSameSeat){
    //     return res.status(400).send({'msg':'This Seat Already Booked On this Date'});
    // }


            // // Seat Number Checking
            // const isSameSeat = await mongo.selectDB.collection("ticketBooking").findOne({seat_no:req.body.seat_no});
            // if(!isSameSeat){
            //     return res.status(400).send({'msg':'This Seat Not Available On this Date'});
            // }
       
//Cancel (or) Delete Ticket ===========================================================================================

module.exports.deleteTicket = async (req,res) => {
    try{
        const id = req.params.id;
        const deleteResponse = await mongo.selectDB.collection("ticketBooking").remove({_id:ObjectId(id)});
        res.send(deleteResponse);

    }catch(err){
        console.error(err);
    }
}

//Ticket Booking with return ticket============================================================================
module.exports.newTicketWithReturn = async (req,res) => {
   
   
    const existUser =( await mongo.selectDB.collection("ticketBooking")
    .find(
        {$and:[
            {'from' : req.body.from},
            {'to' : req.body.to},
            {'return' : req.body.return},
            {'depart' : req.body.depart},
            {'departReturn' : req.body.departReturn},
             {'name': req.body.name},
             {'gender' : req.body.gender},
             {'economy' : req.body.economy},
            {'payment_type' : req.body.payment_type},
            {'seat_no' : req.body.seat_no}
         ]}
    ).count() > 0);



    if( existUser){
        res.status(400).send({'msg' : 'This Seat Not Availale On This Date please Change The Seat Number'});
    }else{
        try{
           

            const insertTicketData = await mongo.selectDB.collection("ticketBooking")
            .insertOne(req.body);
            res.send(insertTicketData);
        }catch(err){
            console.error(err);
            res.status(500).send(err);
        }

    }  
};