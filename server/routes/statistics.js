import express, { query } from "express"
import Product from "../models/product.model.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";

const router = express.Router();

// search item
router.get("/get", async (req, res, next) => {
    try {
        let { search } = req.query;
        let price = Number(req.query.price);
        let page = Number(req.query.page);

        if (search === undefined) {
            search = '';
        }

        if (price === undefined || price === null || price === NaN) {
            price = 0;
        }

        if (page === undefined) {
            page = '';
        }

        const limit = 10;
        const skip = (page - 1) * limit;

        const data = await Product.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
        }).limit(limit).skip(skip).sort({ price: -1 })

        const count = await Product.countDocuments({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ]
        })

        res.status(200).json({
            success: true,
            count,
            data
        });

    } catch (error) {
        next(ErrorHandler(error))
    }
})

// Statistics
router.get("/stat", async (req, res, next) => {
    try {

        const { month } = req.query;
        const data = await Product.find();
        let totalSales = 0;
        let totalItems = 0;
        let totalNotSold = 0;

        data.map(async (item, index) => {
            const date = item.dateOfSale;
            const currentMonth = String(date).split(' ')[1];

            if (month === currentMonth) {

                totalSales += item.price;
                totalItems++;
                if (item.sold === false) {
                    totalNotSold++;
                }

            }
        })

        return res.status(201).json({
            success: true,
            data: {
                totalItems,
                totalSales,
                totalNotSold
            },
        })

    } catch (error) {
        next(error);
    }
})

router.get("/bar-chart", async (req, res, next) => {
    try {

        const queryMonth = req.query.month.toLowerCase();
        const monthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
        const priceArray = [
            { min: 0, max: 100 },
            { min: 100, max: 200 },
            { min: 200, max: 300 },
            { min: 300, max: 400 },
            { min: 400, max: 500 },
            { min: 500, max: 600 },
            { min: 600, max: 700 },
            { min: 700, max: 800 },
            { min: 800, max: 900 },
            { min: 900 }
        ]
        const queryMonthIndex = monthNames.indexOf(queryMonth);

        if (queryMonthIndex === -1) {
            next(ErrorHandler("Invalid Month", 403));
        }

        let productCount = [];

        const countPromises = priceArray.map(async (price, index) => {
            const Count = await Product.countDocuments({
                dateOfSale: { $exists: true },
                price: { $gte: price.min, $lt: price.max },
                $expr: {
                    $eq: [{ $month: "$dateOfSale" }, queryMonthIndex + 1]
                }
            })
            productCount[index] = { range: `${price.min} to ${price.max}`, Count };
        })

        await Promise.all(countPromises);

        res.status(200).json({
            success: true,
            productCount
        })

    } catch (error) {
        next(error);
    }
});

export default router;