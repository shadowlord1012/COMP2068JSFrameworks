//Sets up what is required
var express = require('express');
var router = express.Router();

const Material = require("../models/material");
const Project = require('../models/project');

//controls everything that has to deal with the index
router.get("/", async (req,res,next) =>{

    //Gets all the information for the materials
    Material.find()
        .sort()
        .then(materialData => {
            return res.render('materials/index', {title: "Materials", materialSet : materialData});
        })
        .catch(err =>{
            return res.status(500).json(err);
        });
});

//CRUD functions for the materials 

router.get("/add",async (req,res,next) =>{

    //Gets al the project informaion for the materials 
    Project.find()
        .sort()
        .then(projectInfo => {
            return res.render("materials/add", {title: "Material lists", projectData : projectInfo});
        })
        .catch(err =>{
            return res.status(500).json(err);
        })
    
});
//controls the post  methods
router.post("/add", async (req,res,next) =>{

    //Saves the material information to the database
    Material.create(req.body)
        .then(async (materials) =>{
            await materials.save();
            return res.redirect("/materials");
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});

router.delete('delete/:_id', async (req,res,next) => {
    Material.deleteOne({_id: req.params._id})
        .then(material =>{
            return res.redirect("/materials");
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});

module.exports = router;