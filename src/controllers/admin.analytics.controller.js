const Order = require("../models/order.model");
const Product = require("../models/product.model");
const redisClient = require('../config/redis')

module.exports.monthlySales = async (req, res) => {
  try {
    const data = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalSales: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { "_id.month": 1 } }
    ]);

    res.json(data);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports.totalSales = async (req, res) => {
  try {
    const cacheKey = "admin:totalSales"

    const cachedData = await redisClient.get(cacheKey)

    if (cachedData) {
      console.log(" From Redis Cache")
      return res.json(JSON.parse(cachedData))
    }

    const data = await Order.aggregate([
      { $match: { isPaid: true } },
      {
        $group: {
          _id:null,
          totalAmount: { $sum: '$totalAmount' },
          totalOrders: { $sum: 1}
        }
      }
    ])

    const response = {
        totalSales: data[0]?.totalAmount || 0,
        totalOrders: data[0]?.totalOrders || 0
    }

    // hera data saving in redis (cache for 60 seconds)
    await redisClient.setEx(
      cacheKey,
      60,
      JSON.stringify(response)
    )

    console.log("from mongo DB")
     res.json(response)


  } catch (error) {
    res.status(500).json({ message: err.message })
  }
}

module.exports.salesByDateRange = async (req, res) => {
  try {
    const { from, to } = req.query;

    const data = await Order.aggregate([
      {
        $match: {
          isPaid: true,
          createdAt: {
            $gte: new Date(from),
            $lte: new Date(to)
          }
        }
      },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 }
        }
      }
    ]);

    res.json(data[0] || { totalSales: 0, totalOrders: 0 });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
