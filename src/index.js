const express = require('express')
require('dotenv').config();
const cors = require('cors')
const path = require('path')
const app = express()

app.use(express.json())
app.use(cors())


/*
app.get("/", (req,res) => {
    return res.status(200).send({message:"welcome to ecommerce api"})
})


 */
const authRouters = require("./routes/auth.route")


app.use("/auth", authRouters)

const userRouters = require("./routes/user.route")

app.use("/api/users",userRouters)


const productRouter = require('./routes/product.routes.js')
app.use("/api/products", productRouter)

const adminProductRouter = require('./routes/adminProduct.routes.js')
app.use("/api/admin/products", adminProductRouter)

const cartRouter = require('./routes/cart.routes.js')
app.use("/api/cart", cartRouter)

const cartItemRouter = require('./routes/cartItem.routes.js')
app.use("/api/cart_items", cartItemRouter)

const orderRouter = require("./routes/order.routes.js")
app.use("/api/orders", orderRouter)

const adminOrderRouter = require('./routes/adminOrder.routes.js')
app.use("/api/admin/orders", adminOrderRouter)

const reviewRouter = require("./routes/review.routes.js")
app.use("/api/reviews", reviewRouter)


const ratingRouter = require("./routes/rating.routes.js")
app.use("/api/ratings", ratingRouter)

const paymentRouter = require("./routes/payment.routes")
app.use("/api/payments", paymentRouter)

app.use(express.static(path.resolve(__dirname, '../', './frontend/build')))
//console.log(path.resolve(__dirname, '../', './frontend/build/index'))
app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, '../', './frontend/build/index.html'))
})





module.exports = app

