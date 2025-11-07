//required plugins
const mongoose = require('mongoose');

//create the schema
const orderSchema = {
    id: {type:String, require:true},
    projectId: {type:String, require:true},
    placedby: {type:String,require:true},
    placeddate: {type:Date,require:true},
    deliverydate: {type:Date,require:true},
    materialid: {type:String, require:true},
};

const mongooseSchema = new mongoose.Schema(orderSchema);

module.exports = mongoose.model("Project", mongooseSchema);