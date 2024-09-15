const express = require('express')
const cors = require('cors')

require("./db/mongoose")
const taskRouter = require('./routers/task')
const projectRouter = require('./routers/project')
const userRouter = require('./routers/user')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/tasks', taskRouter)
app.use('/projects', projectRouter)

const port = 3000
app.listen(port, () => {
    console.log("Runing...")
})
