//Sets up all the requirements
var express = require('express');
var router = express.Router();
const Project = require('../models/project');
const Materials = require('../models/material');
const Accounts = require('../models/accounting');
const authenticationMiddleware = require('../extensions/authentication');


router.get("/",authenticationMiddleware, async (req,res,next) => {

    //gets all the project information and creates the accounts
    await Project.find()
        .sort()
        .then(async (project) => {
            project.forEach(proj => {
                Accounts.exists({projectId:proj.projectId})
                       .then(result =>{
                        if(result) {
                            
                        }
                        else {
                            Accounts.create({
                                //Sets all the values of the create
                                projectId: proj.projectId,
                                projectname: proj.name,
                                currenctCost: 0.00,
                                billedAmount: 0.00,
                                budget: proj.budget,
                                difference: 0.00,
                                statusCost: "active",})
                                .then(result => {
                                    result.save();
                                });
                        }
                       });
                
            });
        })
        .catch(err => {
            res.status(500).json(err);
        });
    //loads all the account information
    await Accounts.find()
        .sort()
        .then(async accountInfo => {

            //gets all the materials and populates it by project id
            let material =  await Materials.find().populate('projectId');
            
            //Goes though all the materials
            material.forEach(mat => {
                //goes though all the accounts
                accountInfo.forEach(acc =>{
                    //if the ids match
                    if(mat.projectId == acc.projectId){

                        //calculate the running cost
                        acc.currenctCost += mat.costperunit*mat.amountused;
                        
                        //gets the difference in values
                        acc.difference = acc.budget-acc.currenctCost;
                        
                        //makes sure the project is still active
                        if(acc.statusCost != "success"){
                            
                            //changes the colouring of the table background
                            switch(true)
                            {
                                case acc.difference >= 500:
                                    acc.statusCost = "active";
                                    break;
                                case acc.difference >= 250:
                                    acc.statusCost = "warning";
                                    break;
                                default:
                                    acc.statusCost = "danger";
                                    break;
                            }
                        }                      
                    }
                });
            });
            return res.render("accounts/index", {title: "Accounts", accountData : accountInfo,user: req.user});            
        })
        .catch(err => {
            return res.status(500).json(err);
        });
});


//The delete from Accounts methods
router.get("/delete/:_id", async (req,res,next) => {
    let accountId = req.params._id;

    await Accounts.findByIdAndDelete(accountId);

    res.redirect("/accounts");
});


module.exports = router;