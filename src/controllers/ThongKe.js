const Order = require('../models/OderProduct')
const mongoose = require('mongoose')

exports.revenueByDay = async (req, res) => {
    try {
        const revenueByDay = await Order.aggregate([
            {
                $match: {
                    status: { $ne: "Đã hủy" },
                },
            },
            {
                $group: {
                    _id: {
                        day: {
                            $dayOfMonth: {
                                date: "$createdAt",
                                timezone: "Asia/Ho_Chi_Minh",
                            },
                        },
                        month: {
                            $month: {
                                date: "$createdAt",
                                timezone: "Asia/Ho_Chi_Minh",
                            },
                        },
                        year: {
                            $year: {
                                date: "$createdAt",
                                timezone: "Asia/Ho_Chi_Minh",
                            },
                        },
                    },
                    totalRevenue: { $sum: "$totalPrice" },
                },
            },
            { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
        ]);

        res.json(revenueByDay);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};