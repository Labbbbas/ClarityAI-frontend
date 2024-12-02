import got from 'got';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import qs from 'querystring';

const consumer_key = '';  //Aqui va la clave 1
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
const endpointURL = 'https://api.twitter.com/2/tweets';

export default async function handler(req, res) {
  if (req.method === 'GET') {
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
      console.error('Error al obtener request token:', error);  
      res.status(500).json({ error: 'Error al solicitar el request token' });
    }
  } else if (req.method === 'POST') {
    const { tweet, pin, oauth_token } = req.body;

    if (!tweet || !pin || !oauth_token) {
      return res.status(400).json({ error: 'Tweet, código PIN y OAuth Token son requeridos.' });
    }

    try {
      const accessTokenPath = `https://api.twitter.com/oauth/access_token?oauth_verifier=${pin}&oauth_token=${oauth_token}`;
      const response = await got.post(accessTokenPath, {
        headers: {
          Authorization: oauth.toHeader(oauth.authorize({
            url: accessTokenPath,
            method: 'POST',
            token: { key: oauth_token }
          }))["Authorization"]
        }
      });

      const accessToken = qs.parse(response.body);

      const token = {
        key: accessToken.oauth_token,
        secret: accessToken.oauth_token_secret
      };

      const tweetAuthHeader = oauth.toHeader(oauth.authorize({
        url: endpointURL,
        method: 'POST'
      }, token));

      const tweetResponse = await got.post(endpointURL, {
        json: { text: tweet },
        responseType: 'json',
        headers: {
          Authorization: tweetAuthHeader["Authorization"],
          'user-agent': "v2CreateTweetJS",
          'content-type': "application/json",
          'accept': "application/json"
        }
      });

      res.status(200).json({ message: 'Tweet publicado exitosamente!', response: tweetResponse.body });
    } catch (error) {
      console.error('Error al publicar el tweet:', error);  
      res.status(500).json({ error: 'Error al publicar el tweet: ' + error.message });
    }
  }
}