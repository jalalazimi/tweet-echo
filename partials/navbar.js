import { Component } from 'preact';

export default class Navbar extends Component {

  render() {
    return <nav class="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox"
               width="112" height="28"/>
        </a>
      </div>
    </nav>
  }
}
