//required plugins
const mongoose = require('mongoose');

const delieverySchema = {
    projectId: {type:String},
    projectOwnerAddress: {type:String, require:true},
    delieveryId: {type:String, require:true},
    Date: {type:Date,require:true},
    status: {type:String,require:true},
};

const mongooseSchema = new mongoose.Schema(delieverySchema);

module.exports = mongoose.model("Delievery", mongooseSchema);
