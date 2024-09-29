const express = require('express')
const Tasks = require('../models/Tasks')
const auth = require('../middleware/auth')

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
    try{
        const tasks = await Tasks.find({ owner: req.user._id })

        if (!tasks.length) {
            return res.status(404).send(); 
        }

        res.status(200).send(tasks);
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
})

// get by categories
router.get('/category/:category', auth, async (req, res) => {
    const category = req.params.category

    try {
        const tasks = await Tasks.find({ owner: req.user._id, category });
        
        if (!tasks.length) {
            return res.status(404).send(); 
        }

        res.status(200).send(tasks);
    }
    catch (e) {
        res.status(500).send({ error: e.message });
    }
});

// get task by id
router.get('/:id', auth, async (req, res) => {
    const _id = req.params.id

    try{
        const task = await Tasks.findOne({ _id, owner: req.user._id })

        if(!task){
            return res.status(404).send()
        }
        
        res.status(200).send(task)
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

// update task
router.patch('/:id', auth, async (req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed', 'category']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({ error : "Invalid update!" })
    }

    try{
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
    const _id = req.params.id
    try{
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
