
const appUrlArr = ['http://localhost:8080', 'https://belzy-alertifi.herokuapp.com'];
export const googleDiscoveryDocUrl = 'https://accounts.google.com/.well-known/openid-configuration';
export const gitHubClientId = 'c84d67635ddb8666ae5a';
export const gitHubOAuthUrl = 'https://github.com/login/oauth/authorize?client_id=' + gitHubClientId;
export const googleClientId = '306711972964-k2d2prmru9ojjbg1v584toic2gdu54ht.apps.googleusercontent.com';
export const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${ googleClientId }&response_type=code&scope=openid email profile`;
export const appUrl = appUrlArr[0];
const url = window.location.origin;
