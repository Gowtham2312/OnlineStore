const express = require("express")
const expressErrorHandler = require("express-async-handler")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const adminApiObj = express.Router()

adminApiObj.use(express.json())

let adminCollection;
adminApiObj.use((req,res,next) => {
    adminCollection = req.app.get("adminCollection")
    next()
})

adminApiObj.post("/adminregister",expressErrorHandler(async (req,res)=> {
    //get user from req body
    let newUser = req.body

    // console.log("Newuser: ",newUser)
    
    let user = await adminCollection.findOne({adminname: newUser.adminname})

    if(user !== null)
    {
        res.send({message: "Admin Exists"})
    }
    else
    {
        let hashedPassword = await bcryptjs.hash(newUser.password,5)

        newUser.password = hashedPassword

        await adminCollection.insertOne(newUser)

        res.send({message : "Admin got added"})
    }
}))

adminApiObj.post("/adminlogin", expressErrorHandler(async (req,res) => {

    let adminCredentialsObj = req.body;

    //getting Obj from collection
    let admin  = await adminCollection.findOne({adminname : adminCredentialsObj.adminname})
    //if adminname is wrong or wont exist

    if(admin === null || admin === undefined)
    {
        res.send({ message : "Invalid adminname"})
    }
    else{

        //checking password using bcryptjs.compare method which gives boolean val
        let status = await bcryptjs.compare(adminCredentialsObj.password,admin.password)

        if(status === false)
        {
            res.send({message: "Invalid password"})
        }
        else{
            //create token
            let signedToken = await jwt.sign({ adminname: admin.adminname},process.env.SECRET)
            
            await adminCollection.findOne({ adminname : adminCredentialsObj.adminname})

            //send token as response
            res.send({message:"Login success",token: signedToken,admin: admin})
        }
    }
}))


module.exports = adminApiObj;
