//Sets up all the requirements
var express = require('express');
var router = express.Router();
const Project = require('../models/project');
const Materials = require('../models/material');
const Accounts = require('../models/accounting');


router.get("/", async (req,res,next) => {
    let projectdata = await Project.find().sort();

    //Open up after material CRUD is complete
    let materialData = await Materials.find().sort(projectdata.projectId);

    projectdata.forEach(async (element) =>{
        let accountingInfo = new Accounts;

        accountingInfo.projectId = element.projectId;
        accountingInfo.projectname = element.name;
        accountingInfo.billedAmount = 50.00;
        accountingInfo.budget = 2000.00;
        accountingInfo.currenctCost = 0.00;

        materialData.forEach((materialInfo) =>{
            if(materialInfo.projectId == element.projectId)
            {
                accountingInfo.currenctCost += materialInfo.costperunit*materialInfo.amountused;
            }
        });

        accountingInfo.difference = accountingInfo.budget-accountingInfo.billedAmount;

        if(accountingInfo.difference < 100.00)
        {
            accountingInfo.statusCost = "warning";
        }
        else{
            accountingInfo.statusCost = "active";
        }
        try{
            const exists = await Accounts.findOne({projectname: element.name});
            console.log(exists);
            if(!exists)
                await accountingInfo.save();

            else {
                await Accounts.findByIdAndUpdate(
                    {projectId:accountingInfo.projectId, projectname: accountingInfo.projectname},
                    {accountingInfo});
                console.log("update");
            }

        } catch(error){}
    });

    let accountinglist = await Accounts.find().sort();

    //TODO change project data to accountInfo once materials are done
    res.render("accounts/index", {title: "Accounts", data : projectdata, accountData : accountinglist});
});



module.exports = router;