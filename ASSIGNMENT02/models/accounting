//required plugins
const mongoose = require('mongoose');

const accountSchema = {
    projectId: {type:String},
    projectname: {type:String},
    currenctCost: {type:Number},
    billedAmount: {type:Number},
    budget: {type:Number},
    difference: {type:Number},
    statusCost: {type:String},
}
const mongooseSchema = new mongoose.Schema(accountSchema);

module.exports = mongoose.model("Accounts", mongooseSchema);