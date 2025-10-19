const express = require('express')
const cors = require('cors')
const DBconnection = require("./config/db")
const User_Route =  require("./router/User_Route")
const Store_Route = require("./router/Store_Route")


const app = express()
DBconnection();

app.use(cors())
app.use(express.json())
app.use('/user',User_Route)
app.use('/store',Store_Route)

require("dotenv").config();
const Port = process.env.Port;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(Port, () => {
  console.log(`Server Running in the ${Port}`)
})
