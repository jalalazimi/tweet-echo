const express = require('express')
const request = require('request-promise');
var crypto = require('crypto');
var OAuth = require('oauth-request');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


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


app.get('/', (req, res) => {
  console.log(req.query.id)
  const options = {
    url: 'https://api.twitter.com/1.1/statuses/show.json',
    qs: {id: req.query.id},
    json: true
  };
  twitter.get(options, (err, response, tweets) => {
    if(err) throw new err;
    res.json(tweets);
  })

})

app.listen(8523, () => console.log('Example app listening on port 3000!'))
