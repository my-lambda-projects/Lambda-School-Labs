const functions = require( "firebase-functions" );

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require( "firebase-admin" );
admin.initializeApp();
const store = admin.firestore();

exports.moveTagsToInterests = functions.https.onRequest( ( req, res ) => {
  console.log( "running: Move tags to Interests" );
  store.collection( "/tags" )
    .get()
    .then( res => {
      const tags = [];
      res.forEach( tag => {
        tags.push( tag.data() );
      } );
      
      tags.forEach( tag => {
        store.collection( "/interest" ).add( tag );
      } );
      res.status( 200 ).json( { message: "created interests" } );
    } )
    .catch( err => {
      console.log( "Unable to collect the tags.", err );
      res.status( 500 ).json( { message: "Unable to create new tags" } );
    } );
  
} );

// Sends an email confirmation when a user changes his mailing list
// subscription.
exports.sendEmail = functions.https.onRequest( ( req, res ) => {
  
  cors( req, res, () => {
    // getting dest email by query string
    const dest = req.query.dest;
    
    const mailOptions = {
      from: gmailEmail, to: dest, subject: "I'M A PICKLE!!!", // email subject
      html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
    };
    
    // returning result
    return mailTransport.sendMail( mailOptions, ( erro, info ) => {
      if( erro ){
        console.log( info );
        return res.send( erro.toString() );
      }
      return res.send( "Sended" );
    } );
  } );
  
} );

exports.sendEmailFromApp = functions.https.onRequest( ( req, res ) => {
  cors( req, res, () => {
    // getting dest email by query string
    const dest = req.body.email;
    console.log( "req: ", req );
    const mailOptions = {
      from: gmailEmail, to: dest, subject: "I'M A PICKLE!!!", // email subject
      html: `<p style="font-size: 16px;">Pickle Riiiiiiiiiiiiiiiick!!</p>
                <br />
                <img src="https://images.prod.meredith.com/product/fc8754735c8a9b4aebb786278e7265a5/1538025388228/l/rick-and-morty-pickle-rick-sticker" />
            ` // email content in HTML
    };
    
    // returning result
    return mailTransport.sendMail( mailOptions, ( erro, info ) => {
      if( erro ){
        console.log( info );
        return res.send( erro.toString() );
      }
      return res.send( "Sended" );
    } );
  } );
  
} );

exports.webhookNew = functions.https.onRequest( ( req, res ) => {
  res.send( "Web hooks are working" );
} );

exports.addMessage = functions.https.onCall( ( data, context ) => {
  console.log( data );
  return {
    message: "call working"
  };
} );