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
    search: '',
    transcript: [],
    chats: [],
    timeStamp: Number(window.location.search.substr(1)) || 1,
    fuzzy: [],
    favorited: '',
  };

  ref = (player) => {
    this.player = player;
  };

  componentDidMount = async () => {
    await this.setState({ loading: true });

    // as long as these don't need to be done in sequence, Promise.all is the best way to handle this
    const [video, transcript, chats] = await Promise.all([
      fetchVideo(
        this.props.match.params.id,
        this.props.token
      ),
      fetchTranscript(
        this.props.match.params.id,
        this.props.token
      ),
      fetchChat(
        this.props.match.params.id, 
        this.props.token)
    ]);

    await this.setState({
      video: video,
      transcript: transcript,
      chats: chats,
      loading: false,
    });

    this.player.seekTo(this.state.timeStamp);
  };

  handleFavorite = async (e) => {
    const newFavorite = {
      uuid: this.state.video.uuid,
      topic: this.state.video.topic,
      start_time: this.state.video.start_time,
      timestamp: "this.state.video.timestamp",
      text: '',
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
      // this should spread all the video properties you need onto the new object
      ...this.state.video,
      id,
      time_start: time_start,
      speaker: "speaker",
      identifier: identifier,
      text: text,
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
      keys: ['text'],
    };

    // super cool!
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
          <img src={"/loading-spinner.gif"} alt={''} className="spinner" />
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
                      {!isSearching
                        // seems like a ternery should work here?
                        ? transcript.map((script) =>
                            seedTranscript(
                              script,
                              this.handleTimeStamp,
                              this.handleBookmark
                            ))
                        : transcript.map((script) =>
                        transcriptRender(
                          fuzzySet,
                          script,
                          this.handleTimeStamp,
                          this.handleBookmark
                        ))
                      }
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

// might make sense to move these to a utils file -- this file is getting pretty busy
const seedTranscript = ({ 
  identifier, 
  text, 
  time_start, 
  speaker, 
  id
}, handleTimeStamp, handleBookmark) => (
  <div>
    <button
      className="bookmark-button"
      onClick={() =>
        handleBookmark(
          identifier,
          text,
          time_start,
          speaker,
          id,
          speaker
        )
      }
    >
      {timeConversion(time_start)}
    </button>
    <div
      onClick={handleTimeStamp}
      className={time_start}
      key={id}
    >
      {" "}
      {text}{" "}
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

const searchHighlight = ({ 
  identifier, 
  text, 
  time_start, 
  speaker, 
  id
}, handleTimeStamp, handleBookmark) => (
  <div>
    <button
      className="bookmark-button"
      onClick={() =>
        handleBookmark(
          identifier,
          text,
          time_start,
          speaker,
          id
        )
      }
    >
      {timeConversion(time_start)}
    </button>
    <div
      onClick={handleTimeStamp}
      className={time_start}
      key={id}
    >
      {text}
    </div>
  </div>
);

const searchTranscript = ({ time_start, id }, handleTimeStamp, handleBookmark) => (
  <div
    onClick={handleTimeStamp}
    className={time_start}
    key={id}
  ></div>
);

const timeConversion = (timestamp) => {
  return `${new Date(timestamp * 1000).toISOString().substr(11, 8)}`;
};
