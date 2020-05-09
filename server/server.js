const http = require("http");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const cors = require("cors");
const connectDB = require("./config/db");
//Set the path to access env variables
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

const transactions = require("./routes/transactions");

//Use this route for the transactions route
app.use("/api/v1/transactions", transactions);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server has started.`));
