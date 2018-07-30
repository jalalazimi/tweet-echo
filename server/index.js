const express = require('express')
const request = require('request-promise');
const crypto = require('crypto');
const cors = require('cors');
const OAuth = require('oauth-request');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


var twitter = OAuth({
  consumer: {
    key: 'uloHq83EUIjx32TSnqJUTWTXt',
    secret: 'FODNE2TyueQEDuwhPRUmbWyniKQgtCQKbbsjEddtLFMACRbFoM'
  },
  signature_method: 'HMAC-SHA1',
  hash_function: function (base_string, key) {
    return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  }
});

twitter.setToken({
  key: '16341288-Z9c468O0OC3881egpFRN0i3yxDDakfCVTZ2UCLOWb',
  secret: 'wOuH1AKqiTazMLehaNvkLhZ8QHFmx755mKZXa69KhWE23'
});


const getOembed = () => {
  const options = {
    url: 'https://publish.twitter.com/oembed',
    qs: {url: 'https://twitter.com/behzad_bh/status/1020442050464972801'},
    json: true
  };
  return new Promise(function (resolve, reject) {
    twitter.get(options, async (err, response, tweets) => {
      if (err) return reject(err);
      resolve(tweets);
    })
  })
}

const tweetData = async id => {
  const options = {
    url: 'https://api.twitter.com/1.1/statuses/show.json',
    qs: {id},
    json: true
  };
  return new Promise(function (resolve, reject) {
    twitter.get(options, async (err, response, tweets) => {
      if (err) return reject(err);
      resolve(tweets);
    })
  })
}

app.get('/', (req, res) => {
  Promise.all([tweetData(req.query.id), getOembed()])
    .then((tweet) => {
      res.json(Object.assign(tweet[0], tweet[1]))
    })
})

app.listen(8523, () => console.log('Example app listening on port 3000!'))
