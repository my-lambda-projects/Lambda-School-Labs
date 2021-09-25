const functions = require("firebase-functions");
const OpenTok = require("opentok");
const cors = require("cors")({ origin: true });

// just a test endpoint :)
exports.isWorking = functions.https.onRequest((request, response) => {
  response.send("Yep, im alive!!! ");
});

// returns a session ID and token for a video conversations
exports.getSessionAndToken = functions.https.onRequest((request, response) => {
  // initialize opentok
  const apiKey = functions.config().opentok.apikey;
  const apiSecret = functions.config().opentok.apisecret;

  const opentok = new OpenTok(apiKey, apiSecret);

  // generate a session
  //   cors(request, response, (request, response) => {
  //        may need to wrap cors?? not positive, didnt work but got a different error
  //   });
  opentok.createSession((err, session) => {
    if (err) {
      return response.status(500).json({
        message: "There was an error retrieving your sessionId and token",
        err,
        session: session || "no session details"
      });
    }

    // console.log("i made it past the error stage!");

    let token = opentok.generateToken(session.sessionId);

    response.status(200).json({ sessionId: session.sessionId, token });
  });
});
