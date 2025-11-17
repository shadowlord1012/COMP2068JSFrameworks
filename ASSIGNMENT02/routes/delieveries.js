//required plugins
var express = require('express');
var router = express.Router();
const Delievery = require('../models/delievery');
const Material = require('../models/material');



//The main route
router.get('/', async (req,res,next) => {
    Delievery.find()
             .sort({id:1})
             .then(delievery => {
                return res.render('delieveries/index', {title:"Delievery Schedules",delieveryData:delievery});
             })
             .catch(err =>{
                return res.status(500).json(err);
             });
});

//Details Only. This does not edit anything but for information only
router.get('/details/:delieveryId', async (req,res,next)=> {
    Delievery.find({delieveryId: req.params.delieveryId})
             .then(deli => {
                Material.find({delieveryID: deli.delieveryId})
                        .then(mat =>{
                            return res.render('delieveries/details',{delievery: deli, materialData: mat});
                        })
                        .catch(err =>{
                            return res.status(500).json(err);
                        })
             })
             .catch(err => {
                return res.status(500).json(err);
             });
})

router.get('/map', async (req,res,next) =>{
    res.render('delieveries/map');
});
module.exports = router;