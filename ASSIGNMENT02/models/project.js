//required plugins
const mongoose = require('mongoose');

//create the schema
const projectSchema = {
    name: { type: String, require:true},
    projectId: {type:String, require:true},
    startDate: {type:Date, require:true},
    estimateDate: {type:Date, require:true},
    status: {type:String, default:"Starting.."},
};

const mongooseSchema = new mongoose.Schema(projectSchema);

module.exports = mongoose.model("Project", mongooseSchema);