import './style';
import { Component } from 'preact';
import axios from 'axios';
import { extractingTweetIdFromURL, isValidtwitterUrl } from './helper'

const sanitizeHtml = require('sanitize-html');

export default class App extends Component {

  state = {
    tweet: {}
  }

  componentDidMount() {

  }

  clean(html) {
    return sanitizeHtml(html, {
      allowedTags: [''],
      allowedAttributes: {
        'a': ['href']
      }
    });
  }

  getUrl(evt) {
    console.log(evt)
    this.setState({
      url: evt.target.value
    });
  }


  echo() {
    if (!isValidtwitterUrl(this.state.url)) {
      throw new Error('not valid')
    }
    axios({
      method: 'GET',
      url: `http://localhost:8523?id=${extractingTweetIdFromURL(this.state.url)}`,
    })
      .then((res) => {
        console.log('this.clean(res.data.html)', res.data);
        this.setState({tweet: res.data});
      })
      .catch(err => {
        console.error(err)
      })


  }

  render() {
    return (
      <div>
        <section class="primary-background"
                 style="background-image: url('/static/img/icons-background.svg')">
          <div className="container">
            <nav className="navbar">
              <a href="/" style="display: flex;align-items: center;">
                <img src="/static/img/logo-white.svg" alt=""/>
              </a>
            </nav>
          </div>
          <section className="section has-text-centered">
            <div className="section">
              <p className="heading has-text-white">
              </p>
              <p className="has-text-white" style="font-size: 20px;margin-bottom: 40px;">
              </p>
            </div>
            <input name="url" onChange={evt => this.getUrl(evt)}/>
            <br/>
            <button className="round-button installation chrome-installation"
                    onClick={() => this.echo()}>
              Echo
            </button>



            <div id="tweet">
              <p>{this.state.tweet.text}</p>
            </div>
            <button onClick={}>download</button>
          </section>
        </section>

        <h1>{this.state.tweet && this.clean(this.state.tweet)}</h1>
      </div>
    );
  }
}
