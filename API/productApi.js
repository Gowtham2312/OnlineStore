const express = require("express")
const expressErrorHandler = require("express-async-handler")
//middleware for adding product in DB
const multerObj = require("./middlewares/addimage")
const productApiObj = express.Router()
productApiObj.use(express.json())

productApiObj.use((req,res, next) => {
    productCollection  = req.app.get('productCollection')
    next()
})

//add product
productApiObj.post('/add-products', multerObj.single('photo'), expressErrorHandler(async(req,res) => {

    //get productObj
    const productObj = JSON.parse(req.body.prodObj)
    // add image CDN link to productObj
    productObj.image = req.file.path;
    // save to productCollection
    await productCollection.insertOne(productObj)
    //send ress
    res.send({message: "New product created"})
}))

//update product
productApiObj.post('/update-product', multerObj.single('photo'), expressErrorHandler(async(req,res) => {

    //get productObj
    const p = JSON.parse(req.body.prodObj)
    // add image CDN link to productObj
    p.image = req.file.path;
    // save to productCollection     
    await productCollection.updateOne({productId: p.id}, {$set:{productId : p.productId,
                                                                 productName : p.productName,
                                                                 productPrice : p.productPrice ,
                                                                 productDesc : p.productDesc ,
                                                                 image : p.image}})
    //send ress
    res.send({message: "Product got updated"})
}))

//getting products for searching
productApiObj.get("/get-products", expressErrorHandler( async(req,res)=>{

    let productsdata =  await productCollection.find().toArray()
    res.send({message:"products got fetched",payload: productsdata})
    
 }))

 productApiObj.post("/view-one-product", expressErrorHandler( async(req,res)=>{
    let oneitem = req.body;
    let item = (oneitem.daata).toLowerCase()
    let daata =  await productCollection.find({forsearch : item}).toArray()
     res.send({message:"Single product is ",payload: daata})
 }))

productApiObj.post("/view-products", expressErrorHandler( async(req,res)=>{
    let pcat = req.body;
    //console.log("pcat",pcat)
    let products =  await productCollection.find({productCat: pcat.category}).toArray()
    //console.log("products",products)
    res.send({message:"products",payload: products})
 }))

 productApiObj.post("/delete-product",expressErrorHandler(async(req,res)=>{
     let item = req.body;
     let check = await productCollection.deleteOne({productId: item.id})
     res.send({message:'product got deleted',status: check})
}))

module.exports = productApiObj;