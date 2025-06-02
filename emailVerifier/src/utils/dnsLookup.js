const dnsPromises = require('dns').promises;

const smtpHandshake = require('./smtpHandshake');

// we will check whether the domain has mx record or not, if mx record not found - it means mail can't be delivered. we will use node's built in dns library to check mx record

const dnsCheck = async (mainDomain, fromEmail, toEmail) => {

    try {

        const records = await dnsPromises.resolveMx(mainDomain);

        // mx records extract karo
        // console.log(records);

        // let's say mx record exist karta hai

        if (records.length > 0) {
            // mx records ko priority wise sort kro
            records.sort((a, b) => a.priority - b.priority);
            const primaryHost = records[0].exchange;
            smtpHandshake(primaryHost, fromEmail, toEmail);

        }

        else {
            throw new Error("email is invalid");
        }
    } catch (error) {
        console.log("error aa gya", error.message);
    }


}

module.exports = dnsCheck;
