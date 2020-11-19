import React, { Component } from "react";
import ReactPlayer from "react-player";

export default class Player extends Component {
  state = {
    currentTime: 0,
  };

  ref = (player) => {
    this.player = player;
  };

  // handleCurrentTime = () => {
  //     setInterval(() => { console.log(this.player.getCurrentTime()); }, 1000);
  // }

  componentDidMount = async () => {
    // video start time
    // this.player.seekTo(0);
    // this.handleCurrentTime();
  };

  render() {
    return (
      <div>
        <ReactPlayer
          ref={this.ref}
          url={this.props.video_url}
          controls
          // config={{
          //     file: {
          //         tracks: [
          //             { kind: 'subtitles', src: '../assets/GMT20201109-180413_september-.transcript.vtt', default: true }
          //         ]
          //     }
          // }}
        />
      </div>
    );
  }
}
