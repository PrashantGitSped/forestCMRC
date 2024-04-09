const orderService = require('../services/order.service')

const getAllOrders = async (req,res) =>{
    try{
        const orders = await orderService.getAllOrders()
        return res.status(200).send(orders)
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}
const confirmedOrder = async (req,res) =>{

    const orderId = req.params.orderId

    try{
        const updatedOrder = await orderService.confirmedOrder(orderId)
        return res.status(200).send(updatedOrder)
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}

const shippedOrder = async (req,res) =>{

    const orderId = req.params.orderId

    try{
        const updatedOrder = await orderService.shippedOrder(orderId)
        return res.status(200).send(updatedOrder)
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}
const deliveredOrder = async (req,res) =>{

    const orderId = req.params.orderId

    try{
        const updatedOrder = await orderService.deliveredOrder(orderId)
        return res.status(200).send(updatedOrder)
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}


const cancelledOrder = async (req,res) =>{

    const orderId = req.params.orderId

    try{
        const updatedOrder = await orderService.cancelledOrder(orderId)
        return res.status(200).send(updatedOrder)
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}
const deleteOrder = async (req,res) =>{

    const orderId = req.params.orderId

    try{
        const updatedOrder = await orderService.deleteOrder(orderId)
        return res.status(200).send(updatedOrder)
    }catch(error){
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    getAllOrders,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    cancelledOrder,
    deleteOrder
}