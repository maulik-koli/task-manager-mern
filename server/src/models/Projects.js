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
    list: {
        type: [String],
        default: []
    }
})

const Projects = mongoose.model('Projects', projectSchema)

module.exports = Projects
