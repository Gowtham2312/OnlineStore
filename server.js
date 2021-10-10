const exp = require("express")
const app = exp()

require("dotenv").config()

const path = require("path")
app.use(exp.static(path.join(__dirname,'./build')))

//import APIS objects
const userApiObj = require("./API/userApi")
const adminApiObj = require("./API/adminApi")
const productApiObj = require("./API/productApi")

//use ApiObj's when path start with "/users"
app.use("/users",userApiObj)
app.use("/admin",adminApiObj)
app.use("/products",productApiObj)

//dealing with un-matched paths
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname, './build', 'index.html'))
})

const mongoClient = require('mongodb').MongoClient;
const dbUrl = process.env.DATABASE_URL;

mongoClient.connect(dbUrl, (err, client)=>{
    if(err) {
        console.log("Error while connecting to DB",err)
    }
    else
    {
        let databaseObject = client.db('Grocerydb')
        let userCollection = databaseObject.collection("userCollection")
        let adminCollection = databaseObject.collection("adminCollection")
        let productCollection = databaseObject.collection("productCollection")
        let orderHistory = databaseObject.collection("OrderHistory")

        app.set("userCollection",userCollection)
        app.set("adminCollection", adminCollection)
        app.set("productCollection", productCollection)
        app.set("orderHistory",orderHistory)
        // app.locals.userCollection = userCollection
        // app.locals.adminCollection = adminCollection
        // app.locals.cartCollection = cartCollection
        // app.locals.productCollection = productCollection

        console.log("Connected to DB")
    }
})

app.listen(5050,console.log("Server is running on PORT: 5050"))