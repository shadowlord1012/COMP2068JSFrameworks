//create the users
const mongoose = require('mongoose');

//Creating the encryptions
const plm = require('passport-local-mongoose');

//The object that is to be enter in the data base
const dataSchemaObj = {
    username: { type: String },
    password: { type: String },
    oauthId: {type: String},
    oauthProvider: {type:String},
    created: {type:Date, default:Date.now},
}

//converts it to a mongoose schema
const userSchema = mongoose.Schema(dataSchemaObj);

//Encrypts the data
userSchema.plugin(plm);

//exports the data
module.exports = mongoose.model("User", userSchema);