// docs for SES
// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/SES.html#sendEmail-property

var aws = require("aws-sdk");

const ses = new aws.SES({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  Bucket: process.env.Bucket
});

app.get("/", (req, res) => {
  var to = ["yourverifiedemail@email.com"];
  var from = "yourverifiedemail@email.com";
  ses.sendEmail(
    {
      Source: from,
      Destination: { ToAddresses: to },
      Message: {
        Subject: {
          Data: "Email from Amazon SES"
        },
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: "Hey, It's a Email from amazon SES(Simple Email Service)"
          }
        }
      }
    },
    function(err, data) {
      if (err) throw err;
      console.log("Email sent:");
      console.log(data);
      return false;
    }
  );
});
