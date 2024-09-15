const express = require('express')
const Tasks = require('../models/Tasks')

const router = express()

// create task
router.post('/', async (req, res) => {
    const task = new Tasks(req.body)

    try{
        await task.save()
        res.status(201).send({ message: "Task created and added" })
    }
    catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// get all tasks
router.get('/', async (req, res) => {
    try{
        const tasks = await Tasks.find()
        res.status(200).send(tasks)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

// get task categories wise
router.get('/:category', async (req, res) => {
    try{
        const category = req.params.category
        const tasks = await Tasks.find({ category })

        if(!tasks){
            return res.status(404).send({ error: "There is no tasks of this category" })
        }
        res.status(200).send(tasks)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

// update task
router.patch('/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed', 'category']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({ error : "Invalid update!" })
    }

    try{
        const task = await Tasks.findOne({ _id: req.params.id })

        if(!task){
            return res.status(404).send({ error: "Task not found" })
        }

        updates.forEach((update) => task[update] = req.body[update] )
        await task.save()
        res.status(200).send({ message: "Task updated" })
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

// delete tasks
router.delete('/:id', async (req, res) => {
    try{
        const task = await Tasks.findByIdAndDelete(req.params.id)

        if(!task){
            return res.status(404).send({ error: "Task not found" })
        }
        
        res.status(200).send({ message: "Task deleted"})
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

module.exports = router
