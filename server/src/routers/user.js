const express = require('express')
const Users = require('../models/Users')

const router = express()


// steps for making authentication



// sign up
router.post('/', async (req, res) => {
    const user = new Users(req.body)

    try{
        await user.save()
        res.status(201).send({ message: "You succesfully sign up."})
    }
    catch(e){
        res.status(400).send({ message: e.message })
    }
})

// log in
router.post('/login', async (req, res) => {
    try{

    }
    catch(e){

    }
})

// see profile
router.get('/prof', async (req, res) => {
    try{

    }
    catch(e){

    }
})

// update profile
router.patch('/:id', async (req, res) => {
    try{

    }
    catch(e){

    }
})

// delete profile
router.delete('/:id', async (req, res) => {
    try{

    }
    catch(e){

    }
})
