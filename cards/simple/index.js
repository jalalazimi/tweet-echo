import { Component } from 'preact';

export default class Simple extends Component {
  render() {
    const {full_text, extended_entities, user} = this.props.tweet;
    return <div className="card" id="tweet">
      {extended_entities && extended_entities.media[0].media_url ?
        <div className="card-image">
          <figure className="image is-4by3">
            <img src={extended_entities && extended_entities.media[0].media_url} alt="Placeholder image"/>
          </figure>
        </div>
        : null}
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={user && user.profile_image_url} alt="Placeholder image"/>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{user && user.name}</p>
            <p className="subtitle is-6">@{user && user.screen_name}</p>
          </div>
        </div>

        <div className="content">
          {full_text}
          <br/>
        </div>
      </div>
    </div>
  }
}
