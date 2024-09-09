const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reportSchema = new Schema({
    title:{type:String, required:true, trim:true},
    content:{type:String, required:true},
    generatedBy:{type:Schema.Types.ObjectId},
    project:{type:Schema.Types.ObjectId},
    createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Report', reportSchema);