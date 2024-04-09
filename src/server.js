
const app = require(".")
require('dotenv').config();

const {connectDb} = require('./config/db.js')

//console.log(process.env.DATABASE_URL)
const PORT = 5455
app.listen(PORT, async() => {
    await connectDb()
    console.log("ecommerce api listening on PORT", PORT)
})