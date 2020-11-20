import React, { Component } from "react";
import "./App.css";
import DashMenu from "./DashMenu.js";
import ReactPlayer from "react-player";
import Fuse from "fuse.js";
import {
  fetchVideo,
  favoriteVideo,
  fetchTranscript,
  fetchChat,
  bookmarkVideo,
  // fetchFavorites,
} from "./Fetches.js";

export default class VideoDetails extends Component {
  state = {
    loading: false,
    video: [],
    search: "",
    transcript: [],
    chats: [],
    timeStamp: Number(window.location.search.substr(1)) || 1,
    fuzzy: [],
    favorited: "",
  };

  ref = (player) => {
    this.player = player;
  };

  componentDidMount = async () => {
    await this.setState({ loading: true });

    // const favorites = await fetchFavorites(
    //   this.props.token
    // );

    const video = await fetchVideo(
      this.props.match.params.id,
      this.props.token
    );

    const transcript = await fetchTranscript(
      this.props.match.params.id,
      this.props.token
    );

    const chats = await fetchChat(this.props.match.params.id, this.props.token);

    await this.setState({
      video: video,
      transcript: transcript,
      chats: chats,
      loading: false,
      // favorites: favorites
    });

    // this.determineFavorite();

    this.player.seekTo(this.state.timeStamp);
  };

  // handleFavoriteButton = async (e) => {
  //   if (!this.state.favorited === true) {
  //     e.target.style.backgroundColor = "white";
  //     e.target.style.color = "#2D8CFF";
  //   } else if (this.state.favorited === true) {
  //     e.target.style.backgroundColor = "#747487";
  //     e.target.style.color = "white";
  //   }
  // };

  // determineFavorite = async (e) => {
  //   let isFavorite = false;
  //   for(let favorite of this.state.favorites){
  //     if(favorite.uuid === this.state.video.uuid){
  //       isFavorite = true;
  //     }
  //   }

  //   this.setState({
  //     favorited: isFavorite
  //   })
  // };

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
      favorited: true
    })

    this.handleFavoriteButton(e);
    
  };

  handleBookmark = async (identifier, text, time_start, speaker, id) => {
    const newBookmark = {
      id: id,
      uuid: this.state.video.uuid,
      topic: this.state.video.topic,
      host_id: this.state.video.host_id,
      start_time: this.state.video.start_time,
      time_start: time_start,
      speaker: "speaker",
      identifier: identifier,
      text: text,
      owner_id: this.state.video.owner_id,
    };

    await bookmarkVideo(newBookmark, this.props.token);
  };

  handleTimeStamp = async (e) => {
    const newTime = Math.floor(e.target.className);
    await this.player.seekTo(newTime);
    this.setState({
      timeStamp: newTime,
    });
  };

  handleSearch = (e) => {
    e.preventDefault();

    const { transcript, search } = this.state;

    const options = {
      includeScore: true,
      shouldSort: true,
      ignoreLocation: true,
      threshold: 0.1,
      keys: ["text"],
    };

    const fuse = new Fuse(transcript, options);
    const fuzzysearch = fuse.search(search);

    this.setState({
      fuzzy: fuzzysearch,
    });
  };

  render() {
    const { transcript, chats, video, loading, fuzzy } = this.state;

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

            <div className="video-detail">
              <div className="video">
                <div>
                  <ReactPlayer
                    ref={this.ref}
                    url={this.state.video.video_play_url}
                    controls
                  />
                </div>
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
                      seedTranscript(
                        script,
                        this.handleTimeStamp,
                        this.handleBookmark
                      )
                    )}
                  {isSearching &&
                    transcript.map((script) =>
                      transcriptRender(
                        fuzzySet,
                        script,
                        this.handleTimeStamp,
                        this.handleBookmark
                      )
                    )}
                </div>

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
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const seedTranscript = (script, handleTimeStamp, handleBookmark) => (
  <div>
    <button
      className="bookmark-button"
      onClick={() =>
        handleBookmark(
          script.identifier,
          script.text,
          script.time_start,
          script.speaker,
          script.id,
          script.speaker
        )
      }
    >
      {timeConversion(script.time_start)}
    </button>
    <div
      onClick={handleTimeStamp}
      className={script.time_start}
      key={script.id}
    >
      {" "}
      {script.text}{" "}
    </div>
  </div>
);

const transcriptRender = (
  fuzzySet,
  script,
  handleTimeStamp,
  handleBookmark
) => {
  if (fuzzySet.has(script.text)) {
    return searchHighlight(script, handleTimeStamp, handleBookmark);
  } else {
    return searchTranscript(script, handleTimeStamp, handleBookmark);
  }
};

const searchHighlight = (script, handleTimeStamp, handleBookmark) => (
  <div>
    <button
      className="bookmark-button"
      onClick={() =>
        handleBookmark(
          script.identifier,
          script.text,
          script.time_start,
          script.speaker,
          script.id
        )
      }
    >
      {timeConversion(script.time_start)}
    </button>
    <div
      onClick={handleTimeStamp}
      className={script.time_start}
      key={script.id}
    >
      {script.text}
    </div>
  </div>
);

const searchTranscript = (script, handleTimeStamp, handleBookmark) => (
  <div
    onClick={handleTimeStamp}
    className={script.time_start}
    key={script.id}
  ></div>
);

const timeConversion = (timestamp) => {
  return `${new Date(timestamp * 1000).toISOString().substr(11, 8)}`;
};
