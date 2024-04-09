const mongoose = require('mongoose')

const mongoUrl = process.env.DATABASE_URL

//.log(mongoUrl)
const connectDb = () => {
    return mongoose.connect(mongoUrl)
}

module.exports = {connectDb}