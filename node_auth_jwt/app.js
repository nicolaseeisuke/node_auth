require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT


//config JSON
app.use(express.json())

// db conection 
require('./data/db.js')

app.listen(port, () => {
  console.log(`rodando na porta ${port}`);
})

// open route - public route
app.get("/", (req, res) => {
  res.send("API Working!");
});

// middlewares
const validate = require('./middlewares/handleValidation.js')
const {
  userCreateValidation,
  loginValidation
} = require('./middlewares/userValidation.js')

//constrollers
const {
  register,
  login,
  getUserById,
  checkToken
} = require("./controllers/userController.js")


// register user 
app.post('/users/register', userCreateValidation(),validate, register)

// login user
app.post('/users/login', loginValidation(), validate, login )

// get user by id
app.get('/user/:id',checkToken, getUserById)