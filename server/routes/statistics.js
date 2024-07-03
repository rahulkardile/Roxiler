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

        console.log({ search, page, price });

        console.log();
        const data = await Product.find({
            $or: [
                { price: { $gte: price } },
                { title: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
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

        const { month, range } = req.query;
        const data = await Product.find();
        let totalSales = 0;
        let totalItems = 0;
        let totalNotSold = 0;

        let RangeObj = new Object();

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
            },
            range: RangeObj
        })

    } catch (error) {
        next(error);
    }
})

router.get("/bar-chart", async (req, res, next) => {
    try {

        const ZeroToHundred = await Product.countDocuments({ price: { $gte:0 , $lt: 100 } });
        const hundred_to_two_hundred = await Product.countDocuments({ price: { $gte: 100, $lt: 200 } });
        const TwoHundred_to_ThreeHundred = await Product.countDocuments({ price: { $gte: 200, $lt: 300 } });
        const ThreeHundred_to_FourHundred = await Product.countDocuments({ price: { $gte: 300, $lt: 400 } });
        const FourHundred_to_FiveHundred = await Product.countDocuments({ price: { $gte: 400, $lt: 500 } });
        const FiveHundred_to_SixHundred = await Product.countDocuments({ price: { $gte: 500, $lt: 600 } });
        const SixHundred_to_SevenHundred = await Product.countDocuments({ price: { $gte: 600, $lt: 700 } });
        const SevenHundred_to_EightHundred = await Product.countDocuments({ price: { $gte: 700, $lt: 800 } });
        const EightHundred_to_NineHundred = await Product.countDocuments({ price: { $gte: 800, $lt: 900 } });
        const Above_NineHundred = await Product.countDocuments({ price: { $gte: 900} });

        const data ={
            '0-100': ZeroToHundred,
            '100-200': hundred_to_two_hundred,
            '200-300': TwoHundred_to_ThreeHundred,
            '300-400': ThreeHundred_to_FourHundred,
            '400-500': FourHundred_to_FiveHundred,
            '500-600': FiveHundred_to_SixHundred,
            '600-700': SixHundred_to_SevenHundred,
            '700-800': SevenHundred_to_EightHundred,
            '800-900': EightHundred_to_NineHundred,
            'above-900': Above_NineHundred,
        }
        const totalCount = await Product.countDocuments();
        const total = ZeroToHundred + hundred_to_two_hundred + TwoHundred_to_ThreeHundred + ThreeHundred_to_FourHundred +FourHundred_to_FiveHundred + FiveHundred_to_SixHundred + SixHundred_to_SevenHundred + SevenHundred_to_EightHundred + EightHundred_to_NineHundred + Above_NineHundred;

        res.status(200).json({
            success: true,
            data,
            totalByMongo: totalCount,
            ManualTotal: total
        })

    } catch (error) {
        next(error);
    }
});

export default router;