const express = require("express");
const app = express();

const connectDb = require("./config/database");
const psl = require('psl');
const dns = require('dns');
const emailVerifyRouter = require("./routes/emailRoutes");

app.use(express.json());

app.use("/", emailVerifyRouter);

connectDb()
    .then(() => {
        console.log("database connected successfully");
        app.listen(7777, () => {
            console.log("server is listening");
        });
    })
    .catch((error) => {
        console.log("database not connected" + error.message);
    })


