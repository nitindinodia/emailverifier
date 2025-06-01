const express = require("express");
const emailVerifyRouter = express.Router();

const isEmailFormatValid = require("../utils/validation");
const dnsCheck = require("../utils/dnsLookUp");

emailVerifyRouter.post("/", async (req, res) => {
    try {

        const mainDomain = isEmailFormatValid(req);

        // we will check whether the domain has mx record or not, if mx record not found - it means mail can't be delivered. we will use node's built in dns library to check mx record

        dnsCheck(mainDomain);

        res.json({
            message: "hi there bruh",
            data: "email verified"
        });

    } catch (error) {
        res.status(400).send("error aa gya: " + error.message);
    }
});

module.exports = emailVerifyRouter;