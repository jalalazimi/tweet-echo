const express = require('express')
const request = require('request-promise');

const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', (req, res) => {

  const options = {
    method: 'GET',
    url: 'https://api.twitter.com/1.1/statuses/show.json',
    qs: {id: req.query.id},
    headers:
      {
        'Cache-Control': 'no-cache',
        Authorization: 'OAuth oauth_consumer_key="uloHq83EUIjx32TSnqJUTWTXt",oauth_token="16341288-Z9c468O0OC3881egpFRN0i3yxDDakfCVTZ2UCLOWb",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1531603149",oauth_nonce="KTGNsu4i3NU",oauth_version="1.0",oauth_signature="UOXmJP3Jpsma8wK9WQGDiGVgJdw%3D"'
      }
  };
  request(options)
    .then(body => {
      res.json(JSON.parse(body));
    })
    .catch(function (err) {
      throw new Error(err);
    });
})

app.listen(8523, () => console.log('Example app listening on port 3000!'))
