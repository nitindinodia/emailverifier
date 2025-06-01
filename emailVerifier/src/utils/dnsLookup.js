const dns = require('dns');

// we will check whether the domain has mx record or not, if mx record not found - it means mail can't be delivered. we will use node's built in dns library to check mx record

const dnsCheck = (mainDomain)=>{

    dns.resolveMx(mainDomain, (err, records) => {

        if(err){
            console.log("email is invalid");
        }

        if(records.length > 0){
            console.log("valid email");
        }

        else{
            console.log("email is invalid");
        }

    });
}

module.exports = dnsCheck;