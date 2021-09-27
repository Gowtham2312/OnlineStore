// const express = require("express");
// const expressAsyncHandler = require("express-async-handler");
// const cartApiObj = express.Router()


// //body parse middleware
// cartApiObj.use(express.json())
// //get cartCollection object
// let cartCollection;
// cartApiObj.use((req, res, next) => {
//     cartCollection = req.app.get("cartCollection")
//     next()
// })

// //create cart when user registers
// cartApiObj.post('/createcart', expressAsyncHandler(async (req, res) => {
//     let cartObj = req.body;
//     let response = await cartCollection.insertOne(cartObj)
//     res.send({ message: "cart created succesfully" })

// }))

// //add products to cart
// cartApiObj.post('/addtocart', expressAsyncHandler(async (req, res) => {
//     let products = req.body;
//     let username = req.body.username;
//     let cart = req.body.cart;
//     //local storage may be empty then no need  to update
//     if (cart !== null) {
//         let response = await cartCollection.updateOne({ username: username }, { $push: { cart: { $each: cart } } })
    
//     }

//     let newProducts = await cartCollection.findOne({ username: username })
//     res.send({ message: "Product added to cart", payload: newProducts.cart })
// }))

// //delete cart items
// cartApiObj.post('/delete-cartItem',expressAsyncHandler(async(req,res)=>{
//     console.log("In delte cart",req.body)
//     let product=req.body.cart
//     let username=req.body.username
//     let response=await cartCollection.updateOne({username:username},{$pull:{ cart:{ $in : [product]} }  })
//     let newProducts = await cartCollection.findOne({ username: username })
//     res.send({ message: "Product deleted from cart", payload: newProducts.cart })

// }))

// module.exports = cartApiObj
