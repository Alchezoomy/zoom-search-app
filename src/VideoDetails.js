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
    loading: false,
    video: [],
    search: "",
    transcript: [],
    chats: [],
    fuzzy: [],
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
    });
  };

  handleFavorite = async (e) => {
    const { video } = this.state;
    const { token } = this.props;
    const newFavorite = {
      uuid: video.uuid,
      host_id: video.host_id,
      topic: video.topic,
      start_time: video.start_time,
      timestamp: video.timestamp,
      speaker: "",
      text: "",
      owner_id: video.owner_id,
    };
    console.log(newFavorite);

    await favoriteVideo(newFavorite, token);
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
    console.log("fuzzysearch: ", fuzzysearch);

    this.setState({
      fuzzy: fuzzysearch,
    });

    console.log("search: ", search);
  };

  render() {
    const { transcript, chats, video, loading, fuzzy } = this.state;
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
                  onChange={(e) => {
                    this.setState({ search: e.target.value });
                  }}
                  type="text"
                  className="detail-searchbar"
                />
                <button className="detail-search-button">Search</button>
              </form>
            </div>
            <div className="video-detail">
              <div className="video">
                <Player video_url={video.video_play_url} />
                <div className="chat">
                  {chats.map((chat) => (
                    <div>
                      {chat.timestamp} {chat.speaker} {chat.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="buttons">
                <button
                  onClick={this.handleFavorite}
                  className="favorite-button"
                >
                  Favorite
                </button>
                <button className="bookmarks">Bookmark Timestamp</button>
              </div>

              <div className="transcript">
                {/* example: data = [{ item: { title: "title"}}] */}
                {/* data.map((e) => console.log(e.item.title)) */}
                {transcript.map((trans) => {
                  if (fuzzy.length > 0) {
                    fuzzy?.map((match) => {
                      if (match.item.text === trans.text) {
                        {
                          /* console.log("if"); */
                        }
                        <div className="highlight-me" key={trans.time_start}>
                          ({trans.time_start}) {trans.text}
                        </div>;
                      } else {
                        {
                          /* console.log("else"); */
                        }
                        <div key={trans.time_start}>
                          ({trans.time_start}) {trans.text}
                        </div>;
                      }
                    });
                  }
                  return (
                    <div key={trans.time_start}>
                      ({trans.time_start}) {trans.text}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
