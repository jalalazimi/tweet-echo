import { Component } from 'preact';
import Simple from "./simple"

export default class Cards extends Component {
  render() {
    return <div class="container">
      <div className="columns">
        <div class="column is-one-third">
          <Simple tweet={this.props.tweet}/>
        </div>

      </div>
    </div>
  }
}
