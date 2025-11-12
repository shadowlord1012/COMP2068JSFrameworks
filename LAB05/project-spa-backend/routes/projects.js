var express = require('express');
var router = express.Router();
const Project = require('../models/project');

//TODO configure HTTP handlers
//get /api/projects > retrieves all projects in the database

router.get("/",async (req,res,next) => {
    //Gets the information from the database
    Project.find()
           .then(projects =>{
            return res.status(200).json(projects);
           })
           .catch(err => {
            return res.status(500).json(err);
           });
});

router.post("/",async (req,res,next) => {
    //How the information is sent
    Project.create(req.body)
           .then(project => {
            console.log('Project Created');
            return res.status(201).json(project);
           })
           .catch(err =>{
            console.error('error creating porject:',err);
            return res.status(500).json(err);
           });
});

router.delete('/:_id',async (req,res,next) =>{
    Project.deleteOne({_id: req.params._id})
        .then(project => {
            console.log(`Project deleted`);
            return res.status(204).json(project);
        })
        .catch(err => {
            console.error(`Unable to delete Project: `,err);
            return res.status(500).json(err);
        });
});

router.put("/",async(req,res,next) =>{
    Project.findOneAndUpdate({_id :req.body._id}, req.body)
           .then(project => {
            console.log("Updated");
            return res.status(201).json(project);
           })
           .catch(err => {
            console.error('Can not update: ',err);
            return res.status(500).json(err);
           });
})
module.exports = router;