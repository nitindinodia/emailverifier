const validator = require("validator");
const psl = require('psl');

const checkEmailFormatAndGetMainDomain = (req) => {

    // postman se bheje huye email ko extract kar liya
    const { email } = req.body;
    // console.log(email);

    // first check - email format ko validate kar liya

    const isValid = validator.isEmail(email);

    if(!isValid){
        throw new Error("Invalid email format");
    }

    let fulldomain = email.split("@")[1];
    // console.log(fulldomain);

    // if it is a subdomain, then extract main domain 

    const mainDomain = psl.parse(fulldomain).domain;
    return mainDomain;

}

module.exports = checkEmailFormatAndGetMainDomain;


