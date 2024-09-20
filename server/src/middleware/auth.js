const jwt = require('jsonwebtoken')
const Users = require("../models/Users")

const auth = async (req, res, next) => {
    try{
        const token = req.header("Authorization").replace("Bearer ", "")
        const decoded = jwt.verify(token, "iamjustaguywhoisheroforfun")
        const user = await Users.findOne({ _id: decoded._id, 'tokens.token' : token })

        if(!user){
            throw new Error()
        }

        req.token = token
        req.user = user
        next()
    }
    catch(e){
        res.status(401).send({ message: "Please authenticate." })
    }
}

module.exports = auth
