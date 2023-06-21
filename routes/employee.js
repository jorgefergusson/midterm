let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

//connect to model

let Employee = require("../models/employee");

//manage all routes

router.get("/", (req, res, next) => {
    Employee.find((err, employeelist) => {
      if (err) {
        return console.error(err);
      } else {
        //console.log(productlist);
        res.render("employee/list", {
          title: "Employee Info",
          EmployeeList: employeelist,
        });
      }
    });
  });

  router.get("/add", (req, res, next) => {
    res.render("employee/add", { title: "Add a new employee" });
  });
  
  router.post("/add", (req, res, next) => {
    //getting data from form
    let newEmployee = Employee({
      "name": req.body.name,
      "address": req.body.address,
      "contactNumber": req.body.contactNumber
    });
    
    //insert data:
    Employee.create(newEmployee, (err, Employee) => {
      if (err) {
          console.log(err);
          res.end(err);
      } else {
          console.log("Add:" + newEmployee);
          res.redirect("/employee");
      }
    });
  });

  //Delete a record

  router.get('/delete/:id', (req, res, next) => {
    let id = req.params.id;
  
    
  
    Employee.remove({_id: id}, (err) => {
        if(err){
            console.log(err);
            res.end(err);
        }else{
            res.redirect('/employee');
        }
    });
  });

  module.exports = router;