const jwt = require ('jsonwebtoken');
//Authenticate=============================================================================

exports.authenticateUser = (req,res,next) => {

    //Check Weather access token exists in headers
    if(!req.headers.accesstoken)
    return res.status(400).send({msg : "Token Not Found"});

    //Token Verification
    try{
        const user = jwt.verify(req.headers.accesstoken,process.env.SECRET_KEY);
        console.log(user);
        req.body.currentuser = user ;
        next();

    }catch(err){
        console.error(err);
        res.status(400).send({msg : "Unathorised"});
    }

}

//Authorization =================================================================================

exports.authorizeUser = (req,res,next) => {

    if(req.body.currentuser.role ==="admin"){
        next();
    } 
    else{
        return res.status(404).send({msg:"Forbidden : you don't get Access the API"});

    } 
}