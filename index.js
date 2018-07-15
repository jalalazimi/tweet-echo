import './style.scss';
import { Component } from 'preact';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import { extractingTweetIdFromURL, isValidtwitterUrl } from './helper';
import Navbar from './partials/navbar';


var FileSaver = require('file-saver');


export default class App extends Component {
  state = {
    tweet: {}
  }

  componentDidMount() {

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

  download() {
    domtoimage.toBlob(document.getElementById('tweet'))
      .then(function (blob) {
        FileSaver.saveAs(blob, 'my-node.png');
      });
  }

  render() {
    return (
      <div>
        <Navbar></Navbar>
        <section class="hero is-primary">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                Tweet Echo
              </h1>
              <h2 class="subtitle">
                Primary subtitle
              </h2>
            </div>
          </div>
        </section>

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
          <button onClick={() => this.download()}>download</button>
        </section>

        <h1>{this.state.tweet}</h1>
      </div>
    );
  }
}
