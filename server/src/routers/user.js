const express = require('express')
const Users = require('../models/Users')
const auth = require('../middleware/auth')

const router = express()

// steps for making authentication and security
// first do curd
// hash password (do it in pre method of schema with 'save')
// set login router
// genrate token
// store token in db
// set middleware of authentication
// set logout
// set logout all

// read all
router.get('/all', async (req, res) => {
    try{
        const users = await Users.find({})

        if(!users){
            res.status(404).send({ message: "Cound not find users" })
        }
        res.status(200).send(users)
    }
    catch(e){
        res.status(400).send({ message: e.message })
    }
})

// sign up
router.post('/', async (req, res) => {
    const user = new Users(req.body)
    const token = await user.generateAuthToken()

    try{
        await user.save()
        res.status(201).send({ user, token, message: "You succesfully sign up."})
    }
    catch(e){
        res.status(400).send({ message: e.message })
    }
})

// login
router.post('/login', async (req, res) => {
    try{
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user , token })
    }
    catch(e){
        res.status(400).send({ message: e.message })
    }
})

// logout
router.post('/logout', auth, async (req, res) => {
    try{
        req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

// logout all
router.post('/logoutAll', auth, async (req, res) => {
    const user = req.user
    try{
        user.tokens = []
        await user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
    }
})

// read profile
router.get('/me', auth, async (req, res) => {
    res.send(req.user)
})

// see profile
router.get('/:id', auth, async (req, res) => {
    try{
        const user = await Users.findById(req.params.id)

        if(!user){
            res.status(404).send({ message: "Cound not find users" })
        }
        res.status(201).send(user)
    }
    catch(e){
        res.status(400).send({ message: e.message })
    }
})

// update profile
router.patch('/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password']
    const isValid = updates.every((update) => allowedUpdates.includes(update))

    if(!isValid){
        return res.status(400).send({ error : "Invalid update!" })
    }

    try{
        const user = await Users.findOne({ _id: req.params.id })

        if(!user){
            return res.status(404).send({ error: "User not found" })
        }

        updates.forEach((update) => user[update] = req.body[update] )
        await user.save()
        res.status(200).send({ message: "User updated" })
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

// delete profile
router.delete('/:id', auth, async (req, res) => {
    try{
        const user = await Users.findByIdAndDelete(req.params.id)

        if(!user){
            return res.status(404).send({ error: "User not found" })
        }
        
        res.status(200).send({ message: "User deleted"})
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

module.exports = router
