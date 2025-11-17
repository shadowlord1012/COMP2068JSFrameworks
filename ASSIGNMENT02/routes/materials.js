//Sets up what is required
var express = require('express');
var router = express.Router();

const Material = require("../models/material");
const Project = require('../models/project');

//controls everything that has to deal with the index
router.get("/:projectId", async (req,res,next) =>{
    //Gets all the information for the materials
    Material.find({projectId: req.params.projectId})
        .sort()
        .then(materialData => {
            return res.render('materials/index', {title: "Materials", materialSet : materialData, projectID : req.params.projectId});
        })
        .catch(err =>{
            return res.status(500).json(err);
        });
});

//CRUD functions for the materials 
router.get("/add/:projectId",async (req,res,next) =>{
    Project.findById(req.params._id)
        .then(projectInfo => {
            return res.render("materials/add", {title: "Material lists", projectData : projectInfo});
        })
        .catch(err =>{
            return res.status(500).json(err);
        });    
});

//controls the post  methods
router.post("/add/:projectId", async (req,res,next) =>{

    //Saves the material information to the database
    Material.create(req.body)
        .then(async (materials) =>{
            materials.projectId = req.params.projectId;
            await materials.save();
            return res.redirect("/materials/"+req.params.projectId);
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});

router.get('/:projectId/delete/:_id', async (req,res,next) => {
    //Deletes the material from the database
    Material.findByIdAndDelete(req.params._id)
        .then(()=> {
            return res.redirect("/materials/"+req.params.projectId);
        })
        .catch(err => {
            return res.status(500).json(err);
        })
});

module.exports = router;