const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./Routers/authRouter')
const userRouter = require('./Routers/userRouter')
const supplyRouter = require('./Routers/supplyRouter')
const supplierRouter = require('./Routers/supplierRouter')
const foodRouter = require('./Routers/foodRouter')
const errorExpression = require('./Expressions/error')
const PORT = process.env.PORT || 5000


const app = express()

app.use(express.json())

app.use('/', authRouter)
app.use('/user/', userRouter)
app.use('/supplier/', supplierRouter)
app.use('/supply/', supplyRouter)
app.use('/food/', foodRouter)
app.use(function (req, res, next) {
    return errorExpression(res, 404, 'Page not found');
});

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