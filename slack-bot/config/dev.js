/**
   dev.js
   ====================================
   Project: Hey-Team Slack App
   Created: 2018-05-04
   Updated: 2018-05-16
   Version: 0.2.0
   Team: Jason Campbell, Manisha Lal,
         Christy Crites, Wesley Harvey
   About: Loads development environment
          data
   Notes: OK TO COMMIT
   -------------------------------------
 */

module.exports = {
  client_id: process.env.OKTA_CLIENT_ID,
  issuer: `https://${process.env.OKTA_ORG_URI}/oauth2/default`,
  redirect_uri: `http://${process.env.DEV_SERVER_URI}:${process.env.DEV_SERVER_PORT}/implicit/callback`,
  scope: process.env.OKTA_SCOPE
}
