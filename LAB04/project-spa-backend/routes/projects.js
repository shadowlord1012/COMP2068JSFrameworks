var express = require('express');
var router = express.Router();
const Project = require('../models/project');

//TODO configure HTTP handlers
//get /api/projects > retrieves all projects in the database

router.get("/",async (req,res,next) => {
    let projects = await Project.find();
    //http responce with status code 200 
    res.status(200).json(projects);
});

module.exports = router;