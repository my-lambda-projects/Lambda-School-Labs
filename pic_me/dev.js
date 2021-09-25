/**
 * env config:
 * DEBUG=true
 * DEV=true
 *
 * remember to set these to false in production
 */
exports.debug = process.env.DEBUG === 'true'; /* convert str to bool */
exports.dev = process.env.DEV === 'true';
