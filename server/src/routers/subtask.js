const express = require('express')
const Projects = require('../models/Projects')
const auth = require('../middleware/auth')
const { checkValid } = require('../utils/fuctions')

const router = express()

// add subtasks
router.patch('/:projectId/subtasks', auth, async (req, res) => {
    const { subtask } = req.body;

    if(!subtask){
        return res.status(400).send({ error : "Invalid insert!" })
    }

    try{
        const _id = req.params.projectId
        const project = await Projects.findOne({ _id, owner: req.user._id })
        if(!project){
            return res.status(404).send({ error: "Project not found" })
        }

        const newSubtask = {
            subtask,
            isDone: false
        };

        project.subtasks.push(newSubtask);
        await project.save();
        res.status(201).send(project);
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

//update subtask
router.patch('/:projectId/subtasks/:subtaskId', auth, async (req, res) => {
    const {isValid, updates} = checkValid(req.body, ["subtask", "isDone"])

    if(!isValid){
        return res.status(400).send({ error : "Invalid update!" })
    }

    try{
        const _id = req.params.projectId
        const project = await Projects.findOne({ _id, owner: req.user._id })
        if(!project){
            return res.status(404).send({ error: "Project not found" })
        }

        const subtask = project.subtasks.id(req.params.subtaskId);
        if(!subtask){
            return res.status(404).send({ error: "Data not found" })
        }

        updates.forEach((update) => subtask[update] = req.body[update])
        await project.save()
        res.status(200).send({ project, message: "Project updated" })
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

// delete subtask
router.patch('/:projectId/subtasks/:subtaskId/delete', auth, async (req, res) => {
    const subtaskId = req.params.subtaskId
    try{
        const _id = req.params.projectId
        const project = await Projects.findOne({ _id, owner: req.user._id })
        if(!project){
            return res.status(404).send({ error: "Project not found" })
        }
        
        const originalLength = project.subtasks.length;
        
        project.subtasks = project.subtasks.filter(subtask => subtask._id.toString() !== subtaskId);

        if (project.subtasks.length === originalLength) {
            return res.status(404).send({ error: "Subtask not found" });
        }

        await project.save();
        res.status(200).send(project);
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

module.exports = router
