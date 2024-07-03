import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";
import { GetData } from "./utils/AddProducts.js";
import stat from "./routes/statistics.js"

const app = express();

dotenv.config();
const API_Url = process.env.api;
const PORT = process.env.PORT || 3300;
const MONGO_URL = process.env.MONGO_URL;

try {
    mongoose.connect(MONGO_URL);
    console.log("Database is Connected");
} catch (error) {
    console.log("DataBase is Not Connected");
}

app.use("/api/state", stat);

app.use("*", (req, res, next) => {
    res.status(404).json({
        success: true,
        status: 404,
        message: "Not found!"
    })
})

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 400;
    const message = err.message || "internel server error"

    return res.status(500).json({
        success: false,
        statusCode,
        message
    });

})

app.listen(PORT, () => {
    console.log(`server is running at ${PORT} . . .`);
})