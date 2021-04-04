const express = require('express');
const router = express.Router();


const checkAuth = require('../middleware/check-auth');

const OrderController = require('../controllers/ord');

router.get('/', checkAuth, OrderController.orders_get_all);

router.post('/', checkAuth, OrderController.orders_create_order);

router.get('/:orderId', checkAuth, OrderController.order_get_order);

router.delete('/:orderId', checkAuth, OrderController.order_delete_order);

module.exports = router;