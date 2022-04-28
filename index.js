const express = require('express')
const app = express()
const homeRouter = require('./routes/home')
const authRouter = require('./routes/auth')

app.use(express.json())
app.use('/', homeRouter) 
app.use('/', authRouter) 


app.listen(3000, function () {
    console.log(`Running on port 3000`)
})