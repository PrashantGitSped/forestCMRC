const  orderService = require('../services/order.service.js')

const  createOrder =  async(req,res) =>{

    const user = req.user
    try{
        //console.log(req.body)
        let createdOrder = await orderService.createOrder(user, req.body)
        res.status(201).send(createdOrder)
    }catch(error){
        console.log(error.message)
        return res.status(500).send({error:error.message})
    }
}

const  findOrderById =  async(req,res) =>{
    const user = req.user
    try{
        let order = await orderService.findOrderById(req.params.id)
        res.status(201).send(order)
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}


const  orderHistory =  async(req,res) =>{
    const user = req.user
    try{
        let orders = await orderService.userOrderHistory(user._id)
        res.status(201).send(orders)
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    createOrder,
    findOrderById,
    orderHistory
}


