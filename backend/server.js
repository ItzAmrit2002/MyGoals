const { json } = require('body-parser')
const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware') 
const port = process.env.PORT || 8000
const http = require("http");

let size = http.maxHeaderSize;
console.log('Max HTTP Header size is', size);

connectDB();

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: "false"}))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, ()=> {
    console.log("server running on port: ", port)
})