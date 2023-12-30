const bcrypt = require("bcrypt")
const User = require('../models/User')
const jwt = require('jsonwebtoken')


// generate token
const generateToken = (id) => {
  return jwt.sign({id},secret)
}

const register = async(req,res) => {
  const {name, email,password} = req.body

  // check user existis 

  const userExists = await User.findOne({email:email})

  if(userExists){
    return res.status(422).json({msg:"Email já cadastrado."})
  }

  // create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  //create user 

  const user = await  User.create({
    name,
    email,
    password: passwordHash
  })

  try {
    res.status(200).json({msg:"Usuário cadastrado com sucesso."})

  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Houve um erro tente novamente mais tarde. "})
  }
}


// login user
const login = async(req, res) => {
  const {email, password} = req.body

  // check if user exists 
  const user = await User.findOne({email:email})

  if(!user){
    return res.status(422).json({msg: "Usuário não cadastrado"})
  }

  // check password match
  const checkPassword = await bcrypt.compare(password, user.password)

  if(!checkPassword){
    return res.status(404).json({msg:"Senha incorreta"})
  }

  try {
    const secret = process.env.SECRET
    const token = jwt.sign({id:user._id,}, secret)

    res.status(200).json({msg: "Autenticação realizado com sucesso", token})

  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Houve um erro no servidor tente novamente mais tarde"})
  }

}

// check token 
const checkToken = (req,res,next) => {

  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if(!token){
   return  res.status(401).json({msg: "Acesso negado"})
  }

  try {
    
    const secret = process.env.SECRET

    jwt.verify(token, secret)

    next()

  } catch (error) {
    console.log(error);
    res.status(500).json({msg:"Token inválido"})
  }

}

// get user by id
const getUserById = async(req,res) => {

  const {id} = req.params
  const user = await User.findById(id, '-password')

  if(!user){
    return res.status(401).json({msg:"Usuário não encontrado"})
  }

  res.status(200).json({user})
}

module.exports = {
  register,
  login,
  checkToken,
  getUserById
}


