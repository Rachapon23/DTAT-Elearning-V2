const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const {readdirSync} = require('fs')
require('dotenv').config()

const app = express()

// Static file
app.use(express.static('public'))


//connect cloud Database
mongoose.connect(process.env.DATABASE2,{
    useNewUrlParser:true,
    useUnifiedTopology:false,
    dbName: 'version2',
})
.then(()=>console.log("Connect DataBase success..."))
.catch((err)=>console.log("Connect DataBase error!!! :"+err))

//midleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

//route
readdirSync('./routes').map((r)=>app.use('/api',require('./routes/'+r)))



//run on PORT
const port = process.env.PORT
app.listen(port, () => {
    console.log("running on port", port)
})

