const cartService = require('../services/cart.service.js')

const findUserCart = async(req,res) =>{

    const user = req.user
    try{
        //console.log("in cart")
        const cart = await cartService.findUserCart(user._id)
        //console.log("user cart", cart)
        return res.status(200).send(cart)
    }catch(error){
        res.status(500).send({error:error.message})
    }
}

const addItemToCart = async(req,res) => {
    const user = req.user
    try{
        //console.log("req.body:::" , req.body)
        const cartItem = await cartService.addCartItem(user._id, req.body)
        return res.status(200).send(cartItem)
    }catch(error){
        res.status(500).send({error:error.message})
    }
}

module.exports = {
    findUserCart,
    addItemToCart
}