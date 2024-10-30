const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

dotenv.config()

require("./db/mongoose")
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const projectRouter = require('./routers/project')
const subtaskRouter = require('./routers/subtask')
const errorHandler = require('./middleware/errorHandler')

const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.use('/users', userRouter)
app.use('/tasks', taskRouter)
app.use('/projects', projectRouter)
app.use('/projects', subtaskRouter)
app.use(errorHandler)

const BASE_DIR = path.resolve()
if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(BASE_DIR, "/client/dist")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(BASE_DIR, "client", "dist", "index.html"))
    })
}

app.listen(PORT, () => {
    console.log("Runing...", PORT)
})
