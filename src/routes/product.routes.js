
const express = require('express')
const router = express.Router()


const productController = require('../controller/product.controller.js')

const authenticate = require('../middleware/authenticate')


router.get('/', authenticate, productController.getAllProducts)
router.get('/id/:id', productController.findProductById)

/*

check
router.get('/', authenticate, (req, res) => {
    res.send('GET all products');
});

router.get('/id/:id', authenticate, (req, res) => {
    res.send('GET product by ID');
});
*/
module.exports = router