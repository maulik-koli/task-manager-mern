const mongoose = require('mongoose')

const connectionURL = "mongodb://127.0.0.1:27017/task-mern"

mongoose.connect(connectionURL, {
    // useNewUrlParser : true,
    // useUnifiedTopology : true
}).then(() => {
    // console.log("connected...")
}).catch((e) => {
    console.log(e)
})
