import { Component } from 'preact';
import Simple from "./simple"

export default class Cards extends Component {
  render() {
    return <div className="columns  is-centered">
      <div class="column is-half">
        <Simple tweet={this.props.tweet}/>
      </div>
    </div>
  }
}
