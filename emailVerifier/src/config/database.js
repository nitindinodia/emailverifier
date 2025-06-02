const mongoose = require("mongoose");

const MONGO_PASSWORD = require("../../.env")

const connectDb = async ()=>{
    await mongoose.connect(`mongodb+srv://nitindinodia:${MONGO_PASSWORD}@namastenode.taxlf5g.mongodb.net/emailVerifier`);
}

module.exports = connectDb;




