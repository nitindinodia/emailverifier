const express = require("express");
const emailVerifyRouter = express.Router();
const verifyEmail = require("../controllers/emailController");

emailVerifyRouter.post("/", verifyEmail);

module.exports = emailVerifyRouter;




