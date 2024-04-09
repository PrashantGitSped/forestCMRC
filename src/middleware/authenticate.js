const jwtProvider = require('../config/jwtProvider.js')
const userService = require('../services/user.service.js')



const authenticate = async (req,res,next) => {
    try{
        //console.log("in authenticate")
        const token = req.headers.authorization?.split(" ")[1];
        //console.log(token)
        if(!token){
            return res.status(404).send({error: "Token not found"})
        }

        const userId = jwtProvider.getUserIdFromToken(token)


        const user = await userService.findUserById(userId)
        req.user = user
    }catch(error){
        return res.status(500).send({error: error.message})
    }

    next()
}

module.exports = authenticate


