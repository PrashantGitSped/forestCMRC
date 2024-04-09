const express = require('express')
const router = express.Router()
const authenticate = require('../middleware/authenticate.js')
const adminOrderController = require('../controller/adminOrder.controller.js')

router.get('/', authenticate, adminOrderController.getAllOrders)
router.put('/:orderId/confirm', authenticate, adminOrderController.confirmedOrder)
router.put('/:orderId/ship', authenticate, adminOrderController.shippedOrder)
router.put('/:orderId/deliver', authenticate, adminOrderController.deliveredOrder)
router.put('/:orderId/cancel', authenticate, adminOrderController.cancelledOrder)
router.delete('/:orderId/delete', authenticate, adminOrderController.deleteOrder)

module.exports = router