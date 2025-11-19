//Sets up what is required
var express = require('express');
var router = express.Router();

const Project = require("../models/project");
const Account = require("../models/accounting");
var authenticationMiddleware = require('../extensions/authentication');

//controls everthing that has to do with the index
router.get("/", async (req,res,next) =>{

    //gets the data from the database and sorts it by te id
    let projectData = await Project.find().sort({id: 1});

    res.render('projects/index',{title: "Current Projects", projectSet: projectData,user: req.user});
});

//All the CRUD functions for the projects table.

//Add get methods
router.get("/add", authenticationMiddleware, async (req,res,next) =>{
    res.render("projects/add", {title: "Add a new Project",user: req.user});
});

//Add POST method
router.post("/add",  async (req,res,next) =>{

    //creates a new project object
    let newProject = new Project( {
        name: req.body.projectName,
        projectId: req.body.projectId,
        startDate: req.body.startDate,
        estimateDate: req.body.estimateDate,
        budget: req.body.budget,            
        projectOwnerName: req.body.projectOwnerName,
        projectOwnerAddress: {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
        },

        projectType: req.body.projectType,
    });

    //saves it to the database
    await newProject.save();

    //goes back to the project page
    res.redirect("/projects");
});

//Edit (Update) get method
router.get("/edit/:_id", authenticationMiddleware, async (req,res,next) => {

    //gets the id from the params in the url
    let projectId = req.params._id;

    //finds the data within the database based off of the id 
    let projectData = await Project.findById(projectId);
    res.render("projects/edit", {title:"Edit Current Project", project : projectData, user: req.user});
});

//edit (update) POST method
router.post("/edit/:_id", async (req,res,next) => {

    //gets the id from the params in the url
    let proj = req.params._id;
    //finds and updates that project in the database
    await Project.findOneAndUpdate(
        {_id: proj},
        { $set:{
            name: req.body.name,
            projectId: req.body.id,
            startDate: req.body.startDate,
            estimateDate: req.body.estimateDate,
            status: req.body.status,
            budget: req.body.budget,
            }
        }
    );    

    res.redirect("/projects");
});

//Delete
router.get("/delete/:_id", async (req,res,next) =>{

    //gets the if from the params in the url
    let projectId = req.params._id;

    //deletes the project based on the id it received
    await Project.findByIdAndDelete(projectId);
    res.redirect("/projects");
});

module.exports = router;