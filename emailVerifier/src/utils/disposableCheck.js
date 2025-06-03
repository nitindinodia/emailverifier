// I installed npm package "disposable-email-domains"
// it has list of disposable domain of size over 100k domains

const disposableDomains = require("disposable-email-domains");
const disposableSet = new Set(disposableDomains);

const isDisposableEmail = (mainDomain)=>{

    // console.log(mainDomain);

    if(disposableSet.has(mainDomain)){
        throw new Error("disposable email");
    }
    
    return true;
    // console.log(disposableSet.size); // 121570

}

module.exports = isDisposableEmail;