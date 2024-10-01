const express = require('express')
const cors = require('cors')

require("./db/mongoose")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const projectRouter = require('./routers/project')
const subtaskRouter = require('./routers/subtask')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/tasks', taskRouter)
app.use('/projects', projectRouter)
app.use('/projects', subtaskRouter)
app.use(errorHandler)

const port = 3000
app.listen(port, () => {
    console.log("Runing...", port)
})
