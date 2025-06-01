const mongoose = require("mongoose");
const { isValid } = require("psl");

const emailSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },

    isValidFormat: Boolean,
    hasMxRecords: Boolean,
    isDeliverable: Boolean,
    checkedAt: Date,
    result: String

},
    {
        timestamps: true
    });

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;