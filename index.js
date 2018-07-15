import './style';
import { Component } from 'preact';
import axios from 'axios';

const sanitizeHtml = require('sanitize-html');

export default class App extends Component {

  state = {
    tweet: {}
  }

  componentDidMount() {
    axios({
      method: 'GET',
      url: 'http://localhost:8523',
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

        <h1>{this.state.tweet && this.clean(this.state.tweet)}</h1>
      </div>
    );
  }
}
