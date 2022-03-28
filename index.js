const express = require('express')
const mongoose = require('mongoose')

const cors = require('cors')
const PORT = process.env.PORT || 5000
const app = express()
require('./router')(app)
app.use(express.json())
app.use(cors({
    origin: '*'
}))


const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://course:course@cluster0.qpysx.mongodb.net/Coursework?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`))
    }
    catch (e) {
        console.log(e);
    }
}

start()