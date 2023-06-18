import cron from "node-cron";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import express from "express";
import * as dotenv from "dotenv";
import mainRouter from "./routes/mainRouter";
import { calculateFines } from "./utils/finesUtils";

dotenv.config();
const mongoUrl: string = process.env.MONGO_URL!;

// DB setup
mongoose.connect(mongoUrl).catch((error: unknown) => console.error(error));

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log("Connected to database");
});

// Express setup
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/", mainRouter);

// Fines task setup - runs everyday at midnight
cron.schedule("0 0 * * *", () => {
    calculateFines();
});

// The application is to listen on port number 3000
app.listen(3000, function () {
    console.log("The application is available on port 3000");
});
