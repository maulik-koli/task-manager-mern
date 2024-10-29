const express = require('express')
const Tasks = require('../models/Tasks')
const auth = require('../middleware/auth')
const { checkValid } = require('../utils/fuctions')

const router = express()

// create task
router.post('/', auth, async (req, res) => {
    const task = new Tasks({
        ...req.body,
        owner: req.user._id
    })

    try{
        await task.save()
        res.status(201).send({ task, message: "Task created and added" })
    }
    catch (e) {
        res.status(400).send({ error: e.message })
    }
})

// get all tasks
router.get('/', auth, async (req, res) => {
    const match = {}

    if(req.query.category){
        match.category = req.query.category ? req.query.category : "None"
    }

    if(req.query.completed){
        match.completed = req.query.completed === "true"
    }

    try{
        // const tasks = await Tasks.find({ owner: req.user._id })
        await req.user.populate({
            path: 'tasks',
            match
        })
        const tasks = req.user.tasks

        if (!tasks.length) {
            return res.status(404).send({ error: "There is no Tasks avaiable" }); 
        }

        res.status(200).send(tasks);
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
})

// get all categories
router.get('/categories', auth, async (req, res) => {
    try {
        const categories = await Tasks.distinct('category', { owner: req.user._id })
        
        if (!categories.length) {
            return res.status(404).send({ error: "You have no tasks available yet." })
        }

        res.status(200).send(categories)
    } catch (e) {
        res.status(500).send({ error: e.message })
    }
})

// get task by id
router.get('/:id', auth, async (req, res) => {
    try{
        const _id = req.params.id
        const task = await Tasks.findOne({ _id, owner: req.user._id })

        if(!task){
            return res.status(404).send({ error: "Task is not avaiable" })
        }

        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

// update task
router.patch('/:id', auth, async (req, res) => {
    const {isValid, updates} = checkValid(req.body, ['description', 'completed', 'category'])
    
    if(!isValid){
        return res.status(400).send({ error : "Invalid update!" })
    }
    
    try{
        const _id = req.params.id
        const task = await Tasks.findOne({ _id, owner: req.user._id })

        if(!task){
            return res.status(404).send({ error: "Task not found" })
        }

        updates.forEach((update) => task[update] = req.body[update] )
        await task.save()
        res.status(200).send({ task, message: "Task updated" })
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

// delete tasks
router.delete('/:id', auth, async (req, res) => {
    try{
        const _id = req.params.id
        const task = await Tasks.findByIdAndDelete({ _id, owner: req.user._id })

        if(!task){
            return res.status(404).send({ error: "Task not found" })
        }

        res.status(200).send({ task, message: "Task deleted"})
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

module.exports = router
