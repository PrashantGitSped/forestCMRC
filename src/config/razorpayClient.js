
const RazorPay = require('razorpay');

module.exports = new RazorPay({
    key_id: process.env.KEY_ID,
    key_secret: process.env.KEY_SECRET
});
