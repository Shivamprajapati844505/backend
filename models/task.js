const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title:{type:String, required:true, trim:true},
    description:{type:String},
    status:{type:String, enum:['pending', 'in-progress', 'completed'], default:'pending'},
    dueDate:{type:Date},
    project:{type:Schema.Types.ObjectId, ref:'Project', required:'true'},
    priority:{type:String, enum:['Low', 'Medium', 'High'], default:'Medium'},
    assignedTo:{type:Schema.Types.ObjectId, ref:'User'},
    createdAt:{type:Date, default:Date.now}
});

module.exports = mongoose.model('Task', taskSchema);