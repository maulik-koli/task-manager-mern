const express = require('express')
const Users = require('../models/Users')
const auth = require('../middleware/auth')
const { checkValid } = require('../utils/fuctions')

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
// add middleware for after error of server or others

// read all
// going to remove
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
router.post('/', async (req, res, next) => {
    const user = new Users(req.body)
    
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token, message: "You succesfully sign up."})
    }
    catch(e){
        next(e)
    }
})

// login
router.post('/login', async (req, res, next) => {
    try{
        const user = await Users.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user , token })
    }
    catch(e){
        next(e)
    }
})

// logout
router.post('/logout', auth, async (req, res) => {
    const user = req.user
    try{
        user.tokens = user.tokens.filter((token) => token.token !== req.token)
        await user.save()
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
// going to remove
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
router.patch('/me', auth, async (req, res) => {
    const {isValid, updates} = checkValid(req.body,  ['name', 'email', 'password'])

    if(!isValid){
        return res.status(400).send({ error : "Invalid update!" })
    }

    try{
        const user = req.user
        updates.forEach((update) => user[update] = req.body[update] )
        await user.save()
        res.status(200).send({ user, message: "User updated" })
    }
    catch(e){
        res.status(400).send({ error: e.message })
    }
})

// delete profile
router.delete('/me', auth, async (req, res) => {
    const user = req.user
    try{
        await user.deleteOne()
        res.status(200).send({ user ,message: "User deleted"})
    }
    catch(e){
        res.status(500).send({ error: e.message })
    }
})

module.exports = router
