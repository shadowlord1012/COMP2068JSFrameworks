//required plugins
const mongoose = require('mongoose');

const delieverySchema = {
    projectId: {type:String},
    projectOwnerAddress: [
        {
            street: {type:String, require:true},
            city: {type:String,require:true},
            state: {type:String,require:true},
            zip: {type:String,require:true},
        }
    ],
    deliveryId: {type:String, require:true},
    Date: {type:Date,require:true},
    status: {type:String, default:"Pending"},
};

const mongooseSchema = new mongoose.Schema(delieverySchema);

module.exports = mongoose.model("Delivery", mongooseSchema);
