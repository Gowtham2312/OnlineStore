const express = require("express")
const expressErrorHandler = require("express-async-handler")
const multerObj = require("./middlewares/profilepic")
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userApiObj = express.Router()
const checkToken = require("./middlewares/verifyToken")

userApiObj.use(express.json())

let userCollection;

userApiObj.use((req, res, next) => {
    userCollection = req.app.get("userCollection")
    orderHistory = req.app.get("orderHistory")
    next()
})

userApiObj.post("/register", multerObj.single('profilephoto'), expressErrorHandler(async (req, res) => {
    //get user from req body
    let newUser = JSON.parse(req.body.userObj)

    newUser.profilepic = req.file.path
    // console.log("Newuser: ",newUser)

    let user = await userCollection.findOne({ username: newUser.username })

    if (user !== null) {
        res.send({ message: "User Exists" })
    }
    else {
        let hashedPassword = await bcryptjs.hash(newUser.password, 5)

        newUser.password = hashedPassword

        await userCollection.insertOne(newUser)

        //for user's order history

        let userData = { username: newUser.username, orders: [] }

        await orderHistory.insertOne(userData)

        res.send({ message: "User got added" })
    }
}))

userApiObj.post("/userlogin", expressErrorHandler(async (req, res) => {

    let userCredentialsObj = req.body;

    //getting userObj from collection
    let user = await userCollection.findOne({ username: userCredentialsObj.username })

    console.log("user status", user)
    //if username is wrong or wont exist
    if (user === null) {
        res.send({ message: "Invalid username" })
    }
    else {

        //checking password using bcryptjs.compare method which gives boolean val
        let status = await bcryptjs.compare(userCredentialsObj.password, user.password)

        if (status === false) {
            res.send({ message: "Invalid password" })
        }
        else {
            //create token
            let signedToken = await jwt.sign({ username: user.username }, process.env.SECRET , {expiresIn:"10h"})

            await userCollection.findOne({ username: userCredentialsObj.username })

            //send token as response
            res.send({ message: "Login success", token: signedToken, user: user })
        }
    }
}))


userApiObj.post('/update-userdata',  multerObj.single('profilephoto') , checkToken, expressErrorHandler(async (req, res) => {

    //get userObj
    const newuserdata = JSON.parse(req.body.userobj)
    // add image CDN link to userObj
    newuserdata.profilepic = req.file.path;
    // save to userCollection

    console.log("userObj for update", newuserdata)

    await userCollection.updateOne({ username: newuserdata.usernam }, {
        $set: {
            profilepic: newuserdata.profilepic,
            name: newuserdata.name,
            username: newuserdata.username,
            dob: newuserdata.dob,
            address: newuserdata.address
        }
    })

    await orderHistory.updateOne({ username: newuserdata.usernam   }, { $set: { username : newuserdata.username } })
    //send ress
    res.send({ message: "User got updated" })
}))




userApiObj.post("/updatecart", expressErrorHandler(async (req, res) => {

    //get productObj
    const obj = req.body.object;
    let { user, list , cart } = obj

    await userCollection.updateOne({ username: user }, { $set: { cart: cart, wishlist: list } })
    //send ress
    res.send({ message: "user got updated" })
}))

userApiObj.post("/get-orderhistory", expressErrorHandler(async (req, res) => {

    let name = req.body.name
    let historydata = await orderHistory.findOne({ username: name })
    res.send({ message: "User's Orderhistory fetched", payload: historydata })

}))

userApiObj.post("/update-orderhistory", expressErrorHandler(async (req, res) => {

    //get productObj
    const data = req.body.Obj;

    let result = await orderHistory.updateOne({ username: data.name }, { $push: { orders: data.obj } })
    //send ress
    res.send({ message: "user got updated", payload: result })
}))

userApiObj.get("/get-users", expressErrorHandler(async (req, res) => {

    let users = await userCollection.find().toArray()
    res.send({ message: 'users data', payload: users })
}))

//for edit profile getting updated user name and pic
userApiObj.post("/get-one-user", expressErrorHandler(async (req, res) => {

    let value = req.body.forEditname

    let user = await userCollection.findOne({username : value})
    res.send({ message: 'User data for edit', payload:user})
}))


module.exports = userApiObj;
