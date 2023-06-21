let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to model

let Product = require("../models/product");

//manage all routes

router.get("/", (req, res, next) => {
  Product.find((err, productlist) => {
    if (err) {
      return console.error(err);
    } else {
      //console.log(productlist);
      res.render("product/list", {
        title: "Product Info",
        ProductList: productlist,
      });
    }
  });
});

router.get("/add", (req, res, next) => {
  res.render("product/add", { title: "Add Product" });
});

router.post("/add", (req, res, next) => {
  //getting data from form
  let newProduct = Product({
    "name": req.body.pname,
    "company": req.body.pcompany,
    "price": req.body.pprice
  });
  
  //insert data:
  Product.create(newProduct, (err, Product) => {
    if (err) {
        console.log(err);
        res.end(err);
    } else {
        console.log("Add:" + newProduct);
        res.redirect("/product");
    }
  });
});

//Retrieve data from MongoDB and Open it in view (FORM)
router.get('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  Product.findById(id, (err, productToEdit) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          //write code to display data in view
          res.render('product/edit', { title : 'Edit Product', product: productToEdit})
      }
  });
});

//write code to store updated data into MongoDB
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id;

  let updatedProduct = Product({
      "_id": id,
      "name": req.body.pname,
      "company": req.body.pcompany,
      "price": req.body.price
  });

  Product.updateOne({_id: id}, updatedProduct, (err) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          res.redirect('/product');
      }
  });
});

router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

  

  Product.remove({_id: id}, (err) => {
      if(err){
          console.log(err);
          res.end(err);
      }else{
          res.redirect('/product');
      }
  });
});
module.exports = router;
