//required plugins
var express = require('express');
var router = express.Router();
const Delivery = require('../models/delivery');
const Material = require('../models/material');
const Project = require('../models/project');
const authenticationMiddleware = require('../extensions/authentication');
//Enviroment variables
var configs = require('../configs/global');

//The main route
router.get('/',  authenticationMiddleware, async (req,res,next) => {
    Delivery.find()
             .sort({id:1})
             .then(delievery => {
                return res.render('deliveries/index', {title:"Delievery Schedules",delieveryData:delievery, user: req.user});
             })
             .catch(err =>{
                return res.status(500).json(err);
             });
});

//Details Only. This does not edit anything but for information only
router.get('/details/:deliveryIdNumber', authenticationMiddleware, async (req,res,next)=> {
    Delivery.find({deliveryId: req.params.deliveryIdNumber})
             .then(deli => {
                console.log(deli[0].deliveryId);
                Material.find({deliveryID: deli[0].deliveryId})
                        .then(data => {
                            return res.render('deliveries/details',{title:"Details",delivery: deli[0], materialData: data,user: req.user})
                        })
             })
             .catch(err => {
                return res.status(500).json(err);
             });
})

//configuration for the Map button on the screen
router.get('/map/:cityName', authenticationMiddleware, async (req,res,next) =>{

    //gets the city name from the params
    const city = req.params.cityName;

    //TODO Make it work with any address no matter where it is right to a street id 
    //to get an actual Geoloaction from google has a cost to use that API
    //This gives the rough location based on the city that is entered
    fetch(`https://api.weatherapi.com/v1/current.json?key=${configs.ConnectionStrings.WeatherAPI}&q=${city},ON&api=no`)
                .then(weatherAPI => weatherAPI.json())
                .then(data => {
                    res.render('deliveries/map', {title:"Map Location",mapData: data,user: req.user});
                })
                .catch(err => {
                    console.error("Error fetching or parsing data:",err);
                })
});

//The add Button
router.get('/add', authenticationMiddleware,(req,res,next) =>{
    Project.find()
           .then(projects => {
                return res.render("deliveries/add", {title:"Add Delivery",projectData:projects,user: req.user});
           })
           .catch(err =>{
                return res.status(500).json(err);
           })
});

//Post method
router.post('/add', async (req,res,next) => {

    //Save the Delivery data to the DB
    
    Project.find({projectId:req.body.projectId})
           .then(project =>{
                project.forEach(ele => {
                    Delivery.create({
                    projectId: req.body.projectId,
                    deliveryId: req.body.deliveryId,
                    projectOwnerAddress: {
                        street: ele.projectOwnerAddress[0].street,
                        city: ele.projectOwnerAddress[0].city,
                        state: ele.projectOwnerAddress[0].state,
                        zip: ele.projectOwnerAddress[0].zip,
                    },
                    Date: req.body.expectedDate,
                    status: "pending",
                    });
                });

                res.redirect("/deliveries");
            });
});

//Delete Method
router.get("/delete/:_id", async (req,res,next) => {
    await Delivery.findByIdAndDelete(req.params._id);
    res.redirect("/deliveries");
});

//Edit get method
router.get("/edit/:_id", authenticationMiddleware, async (req,res,next) =>{
    let data = await Delivery.findById(req.params._id);
    res.render("deliveries/edit",{title: "Edit Current Delivery", deliveryData: data ,user: req.user}) 
});

//edit (update POST method)
router.post("/edit/:_id", async (req,res,next) => {
    await Delivery.findOneAndUpdate(
        {_id:req.params._id},
        {
            $set: {
                Date:req.body.expectedDate,
            }
        }
    );
    res.redirect("/deliveries");
});

module.exports = router;