const express = require('express')
const isLoggedIn = require('../middlewares/isLoggedIn')
const router = express.Router()
const productModel = require('../models/product-model')

router.get('/',(req,res)=>{
    // let error = req.flash("error")
    res.render("index")
})

router.get('/shop',isLoggedIn,async (req,res)=>{
    let products = await productModel.find();
    res.render("shop",{products});
})

router.get("/logout",isLoggedIn,(req,res)=>{
    res.redirect("/")
})



module.exports = router;