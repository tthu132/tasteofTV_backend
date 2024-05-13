const OrderService = require('../services/OrderService')
const crypto = require("crypto");
const qs = require("qs");
const moment = require("moment");

const createOrder = async (req, res) => {
    console.log('resssssssssss ', res.body);
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, phone, note } = req.body
        console.log('payment ', req.body);
        if (!paymentMethod || !itemsPrice || !shippingPrice || !totalPrice || !fullName || !address || !phone) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required 1'
            })
        }
        const response = await OrderService.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e.message
        })
    }
}

const getAllOrderDetails = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getAllOrderDetails(userId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getDetailsOrder = async (req, res) => {
    try {
        const orderId = req.params.id
        if (!orderId) {
            return res.status(404).json({
                status: 'ERR',
                message: 'The userId is required'
            })
        }
        const response = await OrderService.getOrderDetails(orderId)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const cancelOrderDetails = async (req, res) => {
    try {
        const data = req.body.orderItems
        const orderId = req.body.orderId
        if (!orderId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The orderId is required'
            })
        }
        const response = await OrderService.cancelOrderDetails(orderId, data)
        return res.status(200).json(response)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}

const getAllOrder = async (req, res) => {
    try {
        const data = await OrderService.getAllOrder()
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}
const getOrdersByUserAndStatus = async (req, res) => {
    try {
        const { userId, status } = req.params;
        console.log('req ', req.params);
        const data = await OrderService.getOrdersByUserAndStatus(userId, status)
        return res.status(200).json(data)
    } catch (e) {
        // console.log(e)
        return res.status(404).json({
            message: e
        })
    }
}
const updateOrder = async (req, res) => {
    try {

        const productId = req.params.id
        const data = req.body
        console.log('req body================================ ', req.body);
        if (!productId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The productId is required'
            })
        }
        const response = await OrderService.updateOrder(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const addOrderByVNPay = async (req, res) => {
    try {
        console.log('avn 1', req.body);

        const {
            totalPriceMemo
        } = req.body;

        var ipAddr =
            req.headers["x-forwarded-for"] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;

        var tmnCode = "L2MRN1AY";
        var secretKey = "CASPYEVWIWVTZDSQOOZTXHFMCAZSHDWK";
        var vnpUrl = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        var returnUrl =
            "http://localhost:3000/orderSuccess?totalPriceMemo=" +
            totalPriceMemo;

        const date = new Date();

        const createDate = moment(date).format("YYYYMMDDHHmmss");
        var bookingId = moment(date).format("DDHHmmss");
        // var amount = price;
        var bankCode = "NCB";

        //var orderInfo = 'Thanh toan don hang';
        var orderType = "billpayment";
        var locale = "vn";
        if (locale === null || locale === "") {
            locale = "vn";
        }
        var currCode = "VND";
        var vnp_Params = {};

        vnp_Params["vnp_Version"] = "2.1.0";
        vnp_Params["vnp_Command"] = "pay";
        vnp_Params["vnp_TmnCode"] = tmnCode;
        vnp_Params["vnp_Locale"] = "vn";
        vnp_Params["vnp_CurrCode"] = currCode;
        vnp_Params["vnp_TxnRef"] = bookingId; //
        vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD: " + bookingId;
        vnp_Params["vnp_OrderType"] = orderType;
        vnp_Params["vnp_Amount"] = totalPriceMemo * 100;
        vnp_Params["vnp_ReturnUrl"] = returnUrl;
        vnp_Params["vnp_IpAddr"] = ipAddr;
        vnp_Params["vnp_CreateDate"] = createDate;
        if (bankCode !== null && bankCode !== "") {
            vnp_Params["vnp_BankCode"] = bankCode;
        }

        ////////////////////////////
        vnp_Params = sortObject(vnp_Params);

        const signData = qs.stringify(vnp_Params, { encode: false });
        const hmac = crypto.createHmac("sha512", secretKey);
        const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

        vnp_Params.vnp_SecureHash = signed;
        vnpUrl += `?${qs.stringify(vnp_Params, { encode: false })}`;
        //res.redirect(vnpUrl);

        ////////////////////////////////

        res.send({
            code: "00",
            vnpUrl,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message,
        });
    }
}
function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
}

module.exports = {
    addOrderByVNPay,
    getOrdersByUserAndStatus,
    createOrder,
    getAllOrderDetails,
    getDetailsOrder,
    cancelOrderDetails,
    getAllOrder,
    updateOrder
}