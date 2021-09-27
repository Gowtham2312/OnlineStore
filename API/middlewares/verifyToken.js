const jwt=require("jsonwebtoken")
require("dotenv").config()

//middleware to check token
const checkToken = (req, res, next) => {
    //get token
    let token = req.headers.authorization.split(" ")[1]
    //if token is not existed
    if (token == null) {
        res.send({ message: "Unauthorized request..Please login to continue.." })
    }
    //if token existed
    else {
        //validate the token
        jwt.verify(token,process.env.SECRET,(err,decodedToken)=>{
            //if token is expired,it returns error
            if(err){
                res.send({message:"Session expired..Relogin to continue."})
            }
            else{
                //forward to next
                next()
            }
        })
    }
}
module.exports= checkToken;