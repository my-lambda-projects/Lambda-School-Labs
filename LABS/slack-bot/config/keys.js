/**
   config/keys.js
   ====================================
   Project: Hey-Team Slack App
   Created: 2018-05-04
   Version: 0.1.0
   Team:    Jason Campbell, Manisha Lal,
   	    Christy Crites, Wesley Harvey
   About:   Loads correct version of keys
   	    depending on whether app is
	    running in dev or prod mode;
   Notes:   OK TO COMMIT
   ------------------------------------
 */

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
module.exports =
    process.env.NODE_ENV === 'production'
    ? require('./prod')
    : require('./dev');

