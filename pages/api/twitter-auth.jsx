import got from 'got';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import qs from 'querystring';

const consumer_key = ''; //Aqui va la clave 1
const consumer_secret = '';  // Aqui va la clave 2

const oauth = OAuth({
  consumer: {
    key: consumer_key,
    secret: consumer_secret
  },
  signature_method: 'HMAC-SHA1',
  hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
});

const requestTokenURL = 'https://api.twitter.com/oauth/request_token?oauth_callback=oob&x_auth_access_type=write';
const accessTokenURL = 'https://api.twitter.com/oauth/access_token';

export default async function handler(req, res) {
  try {
   const authHeader = oauth.toHeader(oauth.authorize({
      url: requestTokenURL,
      method: 'POST'
    }));

    const response = await got.post(requestTokenURL, {
      headers: {
        Authorization: authHeader["Authorization"]
      }
    });

    const requestToken = qs.parse(response.body);

    const authorizeURL = `https://api.twitter.com/oauth/authorize?oauth_token=${requestToken.oauth_token}`;
    
    res.status(200).json({ authorizationUrl: authorizeURL, oauth_token: requestToken.oauth_token });
  } catch (error) {
    res.status(500).json({ error: 'Error al solicitar el request token' });
  }
}