const express = require('express')
const cors = require('cors')
const DBconnection = require("./config/db")
const User_Route =  require("./router/User_Route")
const Store_Route = require("./router/Store_Route")
const Menu_Route = require('./router/Menu_Route')
const Offer_Route = require('./router/Offer_Route')
const Attraction_Route = require('./router/Attraction_Route')

const app = express()
DBconnection();

app.use(cors())
app.use(express.json())
app.use('/user',User_Route)
app.use('/store',Store_Route)
app.use('/menu',Menu_Route)
app.use('/offer',Offer_Route)
app.use('/attraction',Attraction_Route)

require("dotenv").config();
const Port = process.env.Port;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(Port, () => {
  console.log(`Server Running in the ${Port}`)
})
