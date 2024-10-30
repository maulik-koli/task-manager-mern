const mongoose = require('mongoose')

const connectionURL = process.env.DATABASE_URL

mongoose.connect(connectionURL, {
    // useNewUrlParser : true,
    // useUnifiedTopology : true
}).then(() => {
    console.log("Connected to db")
}).catch((e) => {
    console.log(e)
    process.exit(1)
})
