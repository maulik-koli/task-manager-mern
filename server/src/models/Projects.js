const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description : {
        type : String,
        trim: true,
        default: ""
    },
    subtasks: {
        type: [{
            subtask: {
                type: String,
                trim: true,
            },
            isDone: {
                type: Boolean,
                default: false
            }
        }],
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Users",
    }
}, {
    timestamps: true
})

const Projects = mongoose.model('Projects', projectSchema)

module.exports = Projects
