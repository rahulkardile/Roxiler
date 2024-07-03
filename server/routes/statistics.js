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

        if (price === undefined) {
            price = null;
        }

        if (page === undefined) {
            page = '';
        }

        const limit = 10;
        const skip = (page - 1) * limit;

        console.log({ search, page, price });

        console.log();
        const data = await Product.find({
            $or: [
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }).limit(limit).skip(skip).sort({ price: -1 })

        res.status(200).json({
            success: true,
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
            status: 201,
            query: month,
            data: {
                totalItems,
                totalSales,
                totalNotSold
            }
        })

    } catch (error) {
        next(error);
    }
})

export default router;