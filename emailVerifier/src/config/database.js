const mongoose = require("mongoose");

const connectDb = async ()=>{
    await mongoose.connect("mongodb+srv://nitindinodia:Zxo9YlyWHSS517V0@namastenode.taxlf5g.mongodb.net/emailVerifier");
}

module.exports = connectDb;




