const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ProfileSchema = new Schema({
    type: {
        type: String,
    },
    describe: {
        type: String,
    },
    income: {
        type: String,
        rquired:true
    },
    expend: {
        type: String,
        rquired:true
    },
    cash: {
        type: String,
        rquired:true
    },
    remark: {
        type: String,
    },
    date: {
        type: Date,
        default:Date.now
    },
})
module.exports = Profile=mongoose.model("profile",ProfileSchema)