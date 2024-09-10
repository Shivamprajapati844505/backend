const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
    title:{type:String, required:true, trim:true},
    content:{type:String, required:true},
    generatedBy:{type:Schema.Types.ObjectId, ref:'User', required:true},
    project:{type:Schema.Types.ObjectId, ref:'Project', required:true},
    priority:{type:String, enum:['Low', 'Medium', 'High'], default:'Medium'},
    createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Project', projectSchema);