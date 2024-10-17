const express = require('express')
const Projects = require('../models/Projects')
const auth = require('../middleware/auth')
const { checkValid } = require('../utils/fuctions')

const router = express()

// create project
router.post('/', auth, async (req, res) => {
    const project = new Projects({
        ...req.body,
        owner: req.user._id
    })

    try{
        await project.save()
        res.status(201).send({ project, message: "Project created and added" })
    }
    catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// get all project
router.get('/', auth, async (req, res) => {
    try{
        // const projects = await Projects.find({ owner: req.user._id })
        await req.user.populate('projects')
        const projects = req.user.projects

        if(!projects.length){
            res.status(404).send()
        }

        res.status(200).send(projects)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

// get project by id
router.get('/:id', auth, async (req, res) => {
    try{
        const _id = req.params.id
        const project = await Projects.find({ _id, owner: req.user._id })

        if(!project){
            return res.status(404).send()
        }

        res.status(200).send(project)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

// update project
router.patch('/:id', auth, async (req, res) => {
    const {isValid, updates} = checkValid(req.body, ['title', 'description', 'subtasks'])

    if(!isValid){
        return res.status(400).send({ error : "Invalid update!" })
    }

    try{
        const _id = req.params.id
        const project = await Projects.findOne({ _id, owner: req.user._id })

        if(!project){
            return res.status(404).send({ error: "Project not found" })
        }

        updates.forEach((update) => project[update] = req.body[update])
        await project.save()
        res.status(200).send({ project, message: "Project updated" })
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

// delete project
router.delete('/:id', auth, async (req, res) => {
    try{
        const _id = req.params.id
        const project = await Projects.findByIdAndDelete({ _id, owner: req.user._id })

        if(!project){
            return res.status(404).send({ error: "Project not found" })
        }
        
        res.status(200).send({ project, message: "Project deleted"})
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

module.exports = router
