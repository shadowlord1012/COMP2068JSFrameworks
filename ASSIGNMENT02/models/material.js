//required plugins
const mongoose = require('mongoose');
const delievery = require('./delivery');

//create the schema
const materialSchema = {
    name: { type: String, require:true},
    projectId: {type:String, require:true},
    costperunit: {type:Number, require:true},
    orderamount: {type:Number, require:true},
    amountused: {type:Number},
    amountshipped: {type:Number},
    deliveryID: {type:String},
};

const mongooseSchema = new mongoose.Schema(materialSchema);

module.exports = mongoose.model("Material", mongooseSchema);