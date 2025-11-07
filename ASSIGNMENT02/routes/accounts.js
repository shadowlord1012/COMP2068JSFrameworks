//Sets up all the requirements
var express = require('express');
var router = express.Router();
const Project = require('../models/project');
const Materials = require('../models/material');

const accountSchema = {
    projectId: {type:String},
    projectname: {type:String},
    currenctCost: {type:Number},
    billedAmount: {type:Number},
    budget: {type:Number},
    difference: {type:Number},
}

router.get("/", async (req,res,next) => {
    let projectdata = await Project.find().sort();
    
    res.render("accounts/index", {title: "Accounts", data : projectdata});
});

module.exports = router;