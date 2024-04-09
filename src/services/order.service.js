const cartService = require('../services/cart.service')
const OrderItem = require('../models/orderItems.model')
const Order = require("../models/order.model");
const Address = require("../models/address.model.js")
//const OrderItem = require("../models/orderItems.model");

async function createOrder(user, shippAddress){
    let address
    //console.log(user._id)

    if (shippAddress._id){
        let existAddress = await Address.findById(shippAddress._id)
        address = existAddress

    }else{
        address = new Address(shippAddress)
        address.user = user
        await address.save()
        user.address.push(address)
        await user.save()


    }



    const cart = await cartService.findUserCart(user._id)

    let orderItems = []

    for(const item of cart.cartItems){
        const orderItem = new OrderItem({
            price: item.price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice,
        })
        const createdOrderItem = await orderItem.save()
        orderItems.push(createdOrderItem)
    }

    const createdOrder = new Order ({
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discounte: cart.discounte,
        totalItem: cart.totalItem,
        shippingAddress: address,
    })

    createdOrder.user = user;
    const savedOrder = await createdOrder.save()

    //console.log("here it is...")
    return savedOrder
}


async function placedOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="PLACED"
    order.paymentDetails.status = "COMPLETED"

    return await order.save()
}




async function confirmedOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="CONFIRMED"

    return await order.save()
}

async function shippedOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="SHIPPED"

    return await order.save()
}

async function deliveredOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="DELIVERED"

    return await order.save()
}

async function cancelledOrder(orderId){
    const order = await findOrderById(orderId)

    order.orderStatus="CANCELLED"

    return await order.save()
}


async function findOrderById(orderId){
    //console.log("infind order by id")
    const order = await Order.findById(orderId).populate("user").populate({path:"orderItems", populate:{path:"product"}}).populate("shippingAddress")
    return order
}


async function usersOrderHistory(userID){
    try{

        const orders = await Order.find({user:userId, orderStatus:"PLACED"})
            .populate({path:"orderItems", populate:  {path:"product"}}).lean()
        return orders
    }catch(error){
        throw new Error(error.message)
    }
}

async function getAllOrders(){
    //console.log('reaching here in orders')

    return await Order.find().populate({path:"orderItems", populate:  {path:"product"}}).lean()

}

async function deleteOrder(orderId){
    const order = await findOrderById(orderId)
    const data = await Order.findByIdAndDelete(order._id)
    return data
}


module.exports = {
    createOrder,
    placedOrder,
    confirmedOrder,
    shippedOrder,
    deliveredOrder,
    cancelledOrder,
    findOrderById,
    usersOrderHistory,
    getAllOrders,
    deleteOrder
}