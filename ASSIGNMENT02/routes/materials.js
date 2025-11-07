//Sets up what is required
var express = require('express');
var router = express.Router();

const Material = require("../models/material");
const Project = require('../models/project');

//controls everything that has to deal with the index
router.get("/", async (req,res,next) =>{
    let materialData = await Material.find().sort();
    res.render('materials/index', {title: "Materials", materialSet : materialData})
});

//CRUD functions for the materials 

router.get("/add",async (req,res,next) =>{
    let projectInfo = await Project.find().sort();
    res.render("materials/add", {title: "Material lists", projectData : projectInfo});
});
//controls the post  methods
router.post("/add", async (req,res,next) =>{

    let newMaterial = new Material;
    console.log(req.body.projectIndicator);
    newMaterial.name = req.body.name;
    newMaterial.projectId = req.body.projectIndicator;
    newMaterial.costperunit = req.body.basecostperunit;
    newMaterial.orderamount =req.body.orderedamount;
    newMaterial.amountused = req.body.amountused;
    newMaterial.amountshipped = req.body.amountship;

    await newMaterial.save()
    res.redirect('/materials');
});

module.exports = router;