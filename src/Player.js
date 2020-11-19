import React, { Component } from "react";
import ReactPlayer from "react-player";

export default class Player extends Component {

  state = {
    currentTime: 1,
    timeStamp: this.props.timeStamp,
  };

  ref = (player) => {
    this.player = player;
  };

  componentDidMount = async () => {
    // video start time
    await this.player.seekTo(this.props.timeStamp);
    // this.handleCurrentTime();
    console.log(this.props.timeStamp);
  };

  render() {
    return (
      <div>
        <ReactPlayer
          ref={this.ref}
          url={this.props.video_url}
          controls
        />
      </div>
    );
  }
}
