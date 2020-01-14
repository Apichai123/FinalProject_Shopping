const express = require('express')
const app = express()
const cors = require('cors')

const bodyParser = require('body-parser')
const db = require('./models')


const userService = require('./services/user')
const addproductService = require('./services/addproduct')
const getproductCategoty = require('./services/GetProductCategory')
const getUser = require('./services/GetUser')
const delUser = require('./services/deleteuser')

// import passport
const passport = require('passport')

// use the strategy
app.use(passport.initialize())

// file upload
 const fileUpload = require('express-fileupload');
 app.use(fileUpload());
 app.use(express.static('upload'))


app.use(cors())
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// import config of passport
require('./config/passport/passport')

db.sequelize.sync({ alter: false }).then(() => {
  userService(app, db);
  addproductService(app,db)
  getproductCategoty(app,db)
  getUser(app,db)
  delUser(app,db)
  
  app.get('/product', async (req, res) => {
    let productList = await db.Product.findAll()
    res.json(productList)
  })

  app.get('/product-category', async (req, res) => {
    let productCategoryList = await db.ProductCategory.findAll()
    res.json(productCategoryList)
  })

  app.listen(9000, () => console.log("Server is running on port 9000"))
})