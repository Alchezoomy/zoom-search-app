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
  bookmarkVideo,
} from "./Fetches.js";

export default class VideoDetails extends Component {
  state = {
    loading: false,
    video: [],
    search: "",
    transcript: [],
    chats: [],
    timeStamp: 1,
    fuzzy: [],
    favorited: "",
  };

  componentDidMount = async () => {
    await this.setState({ loading: true });
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
      loading: false,
      favorited: this.favorited,
    });
  };

  handleFavoriteButton = async (e) => {
    if (!this.state.favorited === true) {
      e.target.style.backgroundColor = "white";
      e.target.style.color = "#2D8CFF";
    } else if (this.state.favorited === true) {
      e.target.style.backgroundColor = "#747487";
      e.target.style.color = "white";
    }
  };

  handleFavorite = async (e) => {
    const newFavorite = {
      uuid: this.state.video.uuid,
      topic: this.state.video.topic,
      start_time: this.state.video.start_time,
      timestamp: "this.state.video.timestamp",
      text: "",
      owner_id: this.state.video.owner_id,
    };

    await favoriteVideo(newFavorite, this.props.token);

    this.setState({
      favorited: true,
    });

    await this.handleFavoriteButton(e);
  };

  handleBookmark = async (identifier, text, time_start, speaker, id) => {
    const newBookmark = {
      id: id,
      uuid: this.state.video.uuid,
      topic: this.state.video.topic,
      host_id: this.state.video.host_id,
      start_time: this.state.video.start_time,
      time_start: time_start,
      speaker: speaker,
      identifier: identifier,
      text: text,
      owner_id: this.state.video.owner_id,
    };

    await bookmarkVideo(newBookmark, this.props.token);
  };

  handleTimeStamp = async (e) => {
    await this.setState({
      timeStamp: e.target.className,
    });
    console.log(this.state.timeStamp);
  };

  handleSearch = (e) => {
    e.preventDefault();

    const { transcript, search } = this.state;

    const options = {
      includeScore: true,
      shouldSort: true,
      ignoreLocation: true,
      threshold: 0.2,
      keys: ["text"],
    };

    const fuse = new Fuse(transcript, options);
    const fuzzysearch = fuse.search(search);

    this.setState({
      fuzzy: fuzzysearch,
    });

    console.log("search: ", search);
  };

  render() {
    const { transcript, chats, video, loading, fuzzy, timeStamp } = this.state;

    const isSearching = fuzzy.length > 0;

    const fuzzySet = new Set(fuzzy.map((match) => match.item.text));

    return (
      <div className="video-details">
        <div className="left-nav">
          <DashMenu />
        </div>

        {loading ? (
          <img src={"/loading-spinner.gif"} alt={""} className="spinner" />
        ) : (
          <div>
            <h3 className="video-header">{video.topic}</h3>
            <div className="detail-search">
              <form onSubmit={this.handleSearch}>
                <input
                  onChange={(e) => this.setState({ search: e.target.value })}
                  type="text"
                  className="detail-searchbar"
                />
                <button className="detail-search-button">Search</button>
              </form>
            </div>

            <div className="video-detail">
              <div className="video">
                <Player
                  timeStamp={timeStamp}
                  video_url={video.video_play_url}
                />
                <div className="chat-shell">
                  <h4 className="chat-title">Chat</h4>
                  <div className="chat">
                    {chats.map((chat) => (
                      <div key={chat.id}>
                        {chat.timestamp} {chat.speaker} {chat.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="buttons">
                <button
                  onClick={this.handleFavorite}
                  className="favorite-button"
                >
                  Favorite
                </button>
              </div>
              <div className="transcript-shell">
                <h5 className="bookmark-timestamp">Bookmark Timestamp</h5>
                <h4 className="transcript-header">Transcript</h4>
                <div className="transcript">
                  {!isSearching &&
                    transcript.map((script) =>
                      seedTranscript(script, this.handleTimeStamp)
                    )}
                  {isSearching &&
                    transcript.map((script) =>
                      transcriptRender(fuzzySet, script, this.handleTimeStamp)
                    )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const seedTranscript = (script, handleTimeStamp) => (
  <div onClick={handleTimeStamp} className={script.time_start} key={script.id}>
    ({script.time_start}) {script.text}{" "}
  </div>
);

const transcriptRender = (fuzzySet, script, handleTimeStamp) => {
  if (fuzzySet.has(script.text)) {
    return searchHighlight(script, handleTimeStamp);
  } else {
    return searchTranscript(script, handleTimeStamp);
  }
};

const searchHighlight = (script, handleTimeStamp) => (
  <div
    onClick={this.handleTimeStamp}
    className={script.time_start}
    key={script.id}
  >
    <button
      className="bookmark-button"
      onClick={() =>
        this.handleBookmark(
          script.identifier,
          script.text,
          script.time_start,
          script.speaker,
          script.id
        )
      }
    >
      {script.time_start.toFixed(1)}
    </button>
    {script.text}
  </div>
);

const searchTranscript = (script, handleTimeStamp) => (
  <div
    onClick={handleTimeStamp}
    className={script.time_start}
    key={script.time_start}
  ></div>
);
