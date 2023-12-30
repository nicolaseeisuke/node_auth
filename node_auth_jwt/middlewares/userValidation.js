const {body} = require('express-validator')

const userCreateValidation = () => {
  return [
    body('name')
      .isString()
      .withMessage('O nome é obrigatório'),
    body("email")
      .isString()
      .withMessage('O email é obrigatório')
      .isEmail()
      .withMessage("Insira um email válido"),
    body("password")
      .isString()
      .withMessage("A senha é obrigatória"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de senha é obrigatória")
      .custom((value, {req}) => {
        if(value != req.body.password){
          throw new Error('As senhas não são iguais')
        }
        return true
      })
  ]
}

const loginValidation = () => {
  return [
    body('email')
    .isString()
    .withMessage('O email é obrigatório.')
    .isEmail()
    .withMessage('Insira um email válido.'),
    body('password')
    .isString()
    .withMessage('A senha é obrigatória.')
  ]
}

module.exports = {
  userCreateValidation,
  loginValidation
}