const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description : {
        type : String,
        trim: true,
        required: true
    },
    completed : {
        type: Boolean,
        default: false
    },
    category : {
        type: String,
        trim: true,
        default: "None",
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    }
})

const Tasks =  mongoose.model('Tasks', taskSchema)

module.exports = Tasks
