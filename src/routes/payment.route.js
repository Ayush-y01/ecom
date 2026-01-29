const express = require("express");
const router = express.Router();
const webhookCtrl = require("../controllers/webhook.controller");

router.post(
  "/razorpay",
  express.raw({ type: "application/json" }),
  webhookCtrl.razorpayWebhook
);

module.exports = router;
