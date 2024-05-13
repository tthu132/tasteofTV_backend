const express = require("express");
const router = express.Router()
const OrderController = require('../controllers/OrderController');
const ThongKe = require('../controllers/ThongKe');

const { authUserMiddleWare, authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create/:id', authUserMiddleWare, OrderController.createOrder)
router.get('/get-all-order/:id', authUserMiddleWare, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', OrderController.getDetailsOrder)
router.delete('/cancel-order/:id', authUserMiddleWare, OrderController.cancelOrderDetails)
router.get('/get-all-order', authMiddleWare, OrderController.getAllOrder)

router.get('/get-order/:userId', OrderController.getOrdersByUserAndStatus)
router.put('/update/:id', OrderController.updateOrder)

router.post(
    "/payment_vnpay_url/:id",
    authUserMiddleWare,
    OrderController.addOrderByVNPay
);

router.get('/get-chart', ThongKe.revenueByDay)



module.exports = router