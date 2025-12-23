const express = require('express')
const cors = require('cors')
const DBconnection = require("./config/db")
const Login_Route= require("./pages/auth/login/Login_Route")
const User_Route =  require("./pages/user/User_Route")
const Cart_Route = require("./pages/cart/Cart_Router")
const Category_Route =  require("./pages/category/Category_Route")
const Store_Route = require("./pages/store/Store_Route")
const Menu_Route = require('./pages/menu/Menu_Route')
const Role_Route = require('./pages/roles/Role_Route')
const Member_Route = require('./pages/member/Member_Route')
const Offer_Route = require('./pages/offer/Offer_Route')
const Attraction_Route = require('./pages/attraction/Attraction_Route')

const app = express()
DBconnection();

app.use(cors())
app.use(express.json())
app.use("/uploads", express.static("uploads"));
app.use('/auth',Login_Route)
app.use('/user',User_Route)
app.use('/cart',Cart_Route)
app.use('/store',Store_Route)
app.use('/category',Category_Route)
app.use('/role',Role_Route)
app.use('/member',Member_Route)
app.use('/menu',Menu_Route)
app.use('/offer',Offer_Route)
app.use('/attraction',Attraction_Route)

require("dotenv").config();
const Port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(Port, () => {
  console.log(`Server Running in the ${Port}`)
})
