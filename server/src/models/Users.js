const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.toJSON = function() {
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}

userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id : user._id.toString() }, "iamjustaguywhoisheroforfun", { expiresIn: '2 days' })
    
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await Users.findOne({ email })

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if(!isMatch){
        throw new Error('Unable to login')
    }

    return user
}

// this hash the pawwrod and then save in db
userSchema.pre('save', async function (next) {
    const user = this

    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const Users = mongoose.model("Users" ,userSchema)

module.exports = Users
