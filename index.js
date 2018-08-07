import './style.scss';
import { Component } from 'preact';
import axios from 'axios';
import domtoimage from 'dom-to-image';
import { extractingTweetIdFromURL, isValidtwitterUrl } from './helper';
import Navbar from './partials/navbar';
import Cards from './cards';


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
      url: `http://localhost:8523?url=${this.state.url}`,
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
        <Navbar/>
        <div className={"columns is-multiline is-mobile"}>
          <section className="column is-one-quarter hero is-primary">
            <div className="hero-body">
              <div className="container">
                <h1 className="title">
                  Tweet Echo
                </h1>
                <h2 className="subtitle">
                  Primary subtitle
                </h2>
                <div className="field  has-addons">
                  <div className="control is-large is-loading">
                    <input name="url" onChange={evt => this.getUrl(evt)} className="input is-large" type="text"
                           placeholder="Tweet URL"/>
                  </div>
                  <p className="control">
                    <a className="button is-info is-large" onClick={() => this.echo()}>
                      Echo
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <div className={'column'}>
            {Object.keys(this.state.tweet).length ? <Cards tweet={this.state.tweet}/> : null}
          </div>
        </div>

        <section className="section has-text-centered">
          <button className="button" onClick={() => this.download()}>download</button>
        </section>

      </div>
    );
  }
}
