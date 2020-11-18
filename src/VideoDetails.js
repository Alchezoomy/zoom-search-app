import React, { Component } from "react";
import "./App.css";
import DashMenu from "./DashMenu.js";
import Player from "./Player.js";
import Fuse from "fuse.js";
import {
  fetchVideo,
  favoriteVideo,
  fetchTranscript,
  fetchChat,
} from "./Fetches.js";

export default class VideoDetails extends Component {
  state = {
    loading: true,
    video: [],
    search: "",
    transcript: [],
    chats: [],
    fuzzy: "",
    query: "",
  };

  componentDidMount = async () => {
    const video = await fetchVideo(
      this.props.match.params.id,
      this.props.token
    );

    const transcript = await fetchTranscript(
      this.props.match.params.id,
      this.props.token
    );

    const chats = await fetchChat(this.props.match.params.id, this.props.token);

    this.setState({
      video: video,
      transcript: transcript,
      chats: chats,
    });
  };

  handleFavorite = async (e) => {
    const newFavorite = {
      uuid: 10,
      host_id: this.state.video.host_id,
      topic: this.state.video.topic,
      start_time: 4,
      timestamp: 4,
      speaker: "",
      text: "",
      owner_id: this.state.video.owner_id,
    };
    await favoriteVideo(newFavorite, this.props.token);
  };

  handleSearch = async (e) => {
    const { transcript } = this.state;

    const options = {
      includeScore: true,
      shouldSort: true,
      ignoreLocation: true,
      threshold: 0.2,
      keys: ["text"],
    };

    const fuse = new Fuse(transcript, options);
    const fuzzysearch = fuse.search(e.target.value);

    this.setState({
      fuzzy: fuzzysearch,
      query: e.target.value,
    });

    console.log(this.state.fuzzy);
  };

  render() {
    const { transcript, chats, video, fuzzy } = this.state;
    return (
      <div className="video-details">
        <input onChange={(e) => this.handleSearch(e)} />
        <div className="left-nav">
          <DashMenu />
        </div>
        <h3 className="video-header">{video.topic}</h3>
        <div className="video-detail">
          <div className="video">
            <Player video_url={video.video_play_url} />
          </div>
        </div>
        <div className="buttons">
          <button onClick={this.handleFavorite} className="favorite-button">
            Favorite
          </button>
          <button className="bookmarks">Bookmark Timestamp</button>
        </div>
        <div className="transcript">
          {transcript.map((trans) => {
            fuzzy.map((match) => {
              if (match.item?.text === trans.text) {
                return <div className="highlight-me">{trans.text}</div>;
              } else {
                return <div>{trans.text}</div>;
              }
            });
          })}
        </div>
        <div className="chat">
          {chats.map((chat) => (
            <div>
              {chat.timestamp} {chat.speaker} {chat.text}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
