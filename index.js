const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./Routers/authRouter')
const PORT = process.env.PORT || 5000




const app = express()

app.use(express.json())
app.use('/', authRouter)

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://course:course@cluster0.qpysx.mongodb.net/Coursework?retryWrites=true&w=majority`)
        app.listen(PORT, () => console.log('server in running'))
    }
    catch (e) {
        console.log(e);
    }
}

start()