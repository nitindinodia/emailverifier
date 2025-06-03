// const checkEmailFormatAndGetMainDomain = require("../utils/validation");
// const dnsCheck = require("../utils/dnsLookUp");
// const isDisposableEmail = require("../utils/disposableCheck");
// const smtpHandshake = require("../utils/smtpHandshake");

// const verifyEmail = async (req, res) => {
    
//         try {
//             // check if the email format is valid. if email format is valid, get the main domain. 
//             //subdomain is involved and email format is valid, get the main domain from the subdomain.
//             const mainDomain = checkEmailFormatAndGetMainDomain(req);

//             // kya provided email disposable hai ya nahi. Disposable hai to error throw karo, otherwise return true

//             const isDisposable = await isDisposableEmail(mainDomain);

//             const toEmail = req.body.email;

//             const fromEmail = "postmaster@gmail.com";

//             // we will check whether the domain has mx record or not, if mx record not found - it means mail can't be delivered. we will use node's built in dns library to check mx record

//             const primaryHost = await dnsCheck(mainDomain, fromEmail, toEmail);

//             // const resultSmtpHandshake  = smtpHandshake(primaryHost, fromEmail, toEmail);
//             await smtpHandshake(primaryHost, fromEmail, toEmail);
            
//             // if(resultSmtpHandshake == true){
//             //     catchAllCheck(toEmail);
//             // }

//             res.json({
//                 message: "hi there bruh",
//                 data: "email verified"
//             });

//         } catch (error) {
//             res.status(400).send("error aa gya: " + error.message);
//         }
//     }


// module.exports = verifyEmail;


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