const jwt = require('jsonwebtoken')

//console.log(process.env.S_KEY)
const S_KEY = process.env.S_KEY

const generateToken = (userId) =>{
    const token = jwt.sign({userId},S_KEY, {expiresIn: "48h"})
    return token
}

const getUserIdFromToken = (token) => {

    const decodedToken = jwt.verify(token, S_KEY)
    //console.log(token)
    return decodedToken.userId
}

module.exports = {generateToken, getUserIdFromToken}