const express = require('express')
const Projects = require('../models/Projects')

const router = express()

// create project
router.post('/', async (req, res) => {
    const project = new Projects(req.body)

    try{
        await project.save()
        res.status(201).send({ message: "Project created and added" })
    }
    catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// get all project
router.get('/', async (req, res) => {
    try{
        const project = await Projects.find()
        res.status(200).send(project)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

// get project by id
router.get('/:id', async (req, res) => {
    try{
        const id = req.params.id
        const project = await Projects.find({ _id: id })

        if(!project){
            return res.status(404).send({ error: "There is no project of this category" })
        }
        res.status(200).send(project)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

// update project
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['title', 'description', 'list']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({ error : "Invalid update!" })
    }

    try{
        const project = await Projects.findOne({ _id: req.params.id })

        if(!project){
            return res.status(404).send({ error: "Project not found" })
        }

        
        updates.forEach((update) => {
            if(update === "list"){
                const newList = req.body.list

                if (!Array.isArray(newList) || !newList.every(item => typeof item === 'string')) {
                    return res.status(400).send({ error: "Invalid list format. Must be an array of strings." });
                }

                project.list = newList
            }
            else{
                project[update] = req.body[update]
            }
        })
        await project.save()
        res.status(200).send({ message: "Project updated" })
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

// delete project
router.delete('/:id', async (req, res) => {
    try{
        const project = await Projects.findByIdAndDelete(req.params.id)

        if(!project){
            return res.status(404).send({ error: "Project not found" })
        }
        
        res.status(200).send({ message: "Project deleted"})
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

module.exports = router
