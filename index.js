import './style';
import { Component } from 'preact';
import axios from 'axios';

const sanitizeHtml = require('sanitize-html');


// const twitter = new Twitter({
//   consumer_key: 'uloHq83EUIjx32TSnqJUTWTXt',
//   consumer_secret: 'FODNE2TyueQEDuwhPRUmbWyniKQgtCQKbbsjEddtLFMACRbFoM',
//   access_token_key: '16341288-Z9c468O0OC3881egpFRN0i3yxDDakfCVTZ2UCLOWb',
//   access_token_secret: 'wOuH1AKqiTazMLehaNvkLhZ8QHFmx755mKZXa69KhWE23',
// })

export default class App extends Component {

  state = {
    tweet: {}
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'https://api.twitter.com/1.1/statuses/show.json?id=762207487395188736',
      headers: {
        "Authorization": "OAuth oauth_consumer_key=\\\"uloHq83EUIjx32TSnqJUTWTXt\\\",oauth_token=\\\"16341288-Z9c468O0OC3881egpFRN0i3yxDDakfCVTZ2UCLOWb\\\",oauth_signature_method=\\\"HMAC-SHA1\\\",oauth_timestamp=\\\"1531602464\\\",oauth_nonce=\\\"vEQII973SeT\\\",oauth_version=\\\"1.0\\\",oauth_signature=\\\"inmKBk46O2XzF7wLPn8M1wP6d4U%3D\\\"",
      }
    })
      .then((res) => {
        console.log('this.clean(res.data.html)', res);
        this.setState({tweet: res.data});
      })
      .catch(err => {
        console.error(err)
      })
  }

  clean(html) {
    return sanitizeHtml(html, {
      allowedTags: [''],
      allowedAttributes: {
        'a': ['href']
      }
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.tweet && this.clean(this.state.tweet.html)}</h1>
      </div>
    );
  }
}
