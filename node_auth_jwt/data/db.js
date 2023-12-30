const mongoose = require('mongoose')
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS

const con = async() => {
  try {
    const dbCon = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPass}@cluster0.6ehk35w.mongodb.net/?retryWrites=true&w=majority`
    )
    console.log("Conectou ao banco de dados");
    return dbCon
  } catch (error) {
    console.log(error);
  }
}

con()

module.exports = con