const express = require("express");
const router = express.Router();
const postmark = require("postmark");
require("dotenv").config();

router.post("/", (req, res) => {
  const client = new postmark.ServerClient(process.env.POSTMARK_API);
  const { name, email } = req.body;
  // Send an email
  client.sendEmailWithTemplate({
    From: "no-response@josephmt.com",
    To: `${email}`,
    TemplateAlias: "welcome",
    TemplateModel: {
      product_name: "Auto-Invoicer",
      name: `${name}`,
      product_url: "https://auto-invoicer.netlify.com/",
      action_url: "https://auto-invoicer.netlify.com/",
      login_url: "https://auto-invoicer.netlify.com/",
      username: `${email}`,
      support_email: "no-reply@josephmt.com",
      live_chat_url: "https://auto-invoicer.netlify.com/",
      sender_name: "Welcome",
      company_name: "Auto-Invoicer",
      company_address: "WorldWide",
      help_url: "https://auto-invoicer.netlify.com/"
    }
  });
  return res.status(201).json({ message: "Welcome to Auto-Invoicer!" });
});

module.exports = router;
