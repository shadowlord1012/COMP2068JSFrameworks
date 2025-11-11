//Models files are named in singular form
//This file represents a doucment in mongoDB
//Import mongoose
const mongoose = require('mongoose');

const schemaObj = {
    name: {type:String,required:true},
    dueDate: {type:Date},
    course: {type:String,required:true},
    status: {type:String,default: "TO DO"},
}

//create mongoose schema
const mongooseSchema = new mongoose.Schema(schemaObj);

//creates and exports mongoose model
module.exports = mongoose.model("Project_Tracker",mongooseSchema);