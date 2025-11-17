//required plugins
const mongoose = require('mongoose');

const plm = require("passport-local-mongoose");

const accountSchema = {
    projectId: {type:String},
    projectname: {type:String},
    currenctCost: {type:Number},
    budget: {type:Number},
    difference: {type:Number},
    statusCost: {type:String},
}
const mongooseSchema = new mongoose.Schema(accountSchema);

mongooseSchema.plugin(plm);

module.exports = mongoose.model("Accounts", mongooseSchema);