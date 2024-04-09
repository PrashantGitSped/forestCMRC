const razorpay = require('../config/razorpayClient')
const orderService = require('../services/order.service')

const createPaymentLink = async(orderId) => {
    try{

        const order = await orderService.findOrderById(orderId)
        //console.log(order.totalDiscountedPrice)
        const paymentLinkRequest = {
            amount: order.totalDiscountedPrice * 100,
            currency: "INR",
            customer: {
                name: order.user.firstName + " " + order.user.lastName,
                contact: order.user.mobile,
                email: order.user.email
            },
            notify:{
                sms: true,
                email: true
            },
            reminder_enable: true,
            callback_url : `http://localhost:3000/payment/${orderId}`,
            callback_method: 'get'

        }


        const paymentLink = await razorpay.paymentLink.create(paymentLinkRequest)
        //return paymentLink
        const paymentLinkId = paymentLink.id
        const payment_link_url = paymentLink.short_url
        const resData = {
            paymentLinkId,
            payment_link_url
        }
        return resData
    }catch(error){
        throw new Error(error.message)
    }
}

const updatePaymentInformation = async(reqData) => {
    const paymentId = reqData.payment_id
    const orderId = reqData.order_id

    //console.log("reached here 22", reqData.payment_id, reqData.order_id, reqData)

    try{
        const order = await orderService.findOrderById(orderId)

        const payment = await razorpay.payments.fetch(paymentId)
        //console.log(payment.status)
        if(payment.status == 'captured'){
            order.paymentDetails.paymentId = paymentId
            order.paymentDetails.paymentStatus = "COMPLETED"
            order.orderStatus = "PLACED"

            await order.save()
        }

        const resData = {message:"Your order is placed", success: true}
        return resData

    }catch(error){
        throw new Error(error.message)
    }
}

module.exports = {
    createPaymentLink,
    updatePaymentInformation
}