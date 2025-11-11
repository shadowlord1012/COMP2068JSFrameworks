//simple user model
const mongoose = require('mongoose');

//extends with plm for password encryptipn strategy etc.
const pln = require('passort-local-mongoose');

const dataSchema = {
    username: {type:String},
    password: {type:String},
}

const userSchema = mongoose.Schema(dataSchema);

//injects out-of-the-box functionality from plm

userSchema.plugin(plm);

module.exports = mongoose.model("User_Tracker",userSchema);