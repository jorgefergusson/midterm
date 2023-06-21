let mongoose = require("mongoose");


//Create model of product
let employeeModel= mongoose.Schema(
    {
        "name": String,
        "address": String,
        "contactNumber" :String
    },
    {
        collection:"Employees"
    }
);

module.exports = mongoose.model("Employee", employeeModel);