const mongo = require('../connect');
const bcrypt = require ("bcrypt");
const jwt = require ("jsonwebtoken");

//SIGNUP FUNCTION============================================================================================
module.exports.signup = async (req,res) => {
   try{
     // Checking user exist or not
     const existUser = await mongo.selectDB.collection("users")
     .findOne({email:req.body.email});
     if(existUser){
        return res.status(400).send({msg:"You Are already a register User"});
     }

     // conform password check

     const isSamePassword = checkPassword(req.body.password,req.body.conformPassword);
     if(!isSamePassword){
       return  res.status(400).send({msg: "Password Doesn't Match"});
     };

     //Password Encryption 

     const randomString = await bcrypt.genSalt(10);
     req.body.password = await bcrypt.hash(req.body.password,randomString);

     //Save in DataBase
     const insertResponse = await mongo.selectDB.collection("users").insertOne({...req.body});
      res.send(insertResponse);

   }catch(err){
    console.error(err);
    res.status(500).send(err);
   }
}

//password checking
const checkPassword = (password,conformPassword) =>{
    return password !== conformPassword ? false : true ;
};

//SIGNIN FUNCTION ============================================================================================
module.exports.signin = async (req,res) => {
  
      // checking existUser
      const existUser = await mongo.selectDB.collection("users").findOne({email:req.body.email});
      if(!existUser){
         return res.status(400).send({msg:"You Are Not RegisterUser Please Signup Userself"});
      }
      //Email Validation
      const isSamePassword = await bcrypt.compare(req.body.password,existUser.password);
      if(!isSamePassword)
      return res.status(400).send({msg : "Incorrect Password"});

      //Token Generation & Sending
      const token = jwt.sign(existUser,process.env.SECRET_KEY, {expiresIn : '2hr'});
      res.send(token);

  
}