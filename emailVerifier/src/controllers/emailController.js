const isEmailFormatValid = require("../utils/validation");
const dnsCheck = require("../utils/dnsLookUp");
const disposableCheck = require("../utils/disposableCheck");

const verifyEmail = async (req, res) => {
    
        try {

            const mainDomain = isEmailFormatValid(req);

            disposableCheck(mainDomain);

            const toEmail = req.body.email;

            const fromEmail = "postmaster@gmail.com";

            // we will check whether the domain has mx record or not, if mx record not found - it means mail can't be delivered. we will use node's built in dns library to check mx record

            dnsCheck(mainDomain, fromEmail, toEmail);


            res.json({
                message: "hi there bruh",
                data: "email verified"
            });

        } catch (error) {
            res.status(400).send("error aa gya: " + error.message);
        }
    }


module.exports = verifyEmail;