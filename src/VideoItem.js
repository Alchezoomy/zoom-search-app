import React, { Component } from "react";

export default class VideoItem extends Component {
  render() {
    return (
      <div className="video-item">
        <p className="topic">{this.props.topic}</p>
        <span className="upload-date">
          {convertDate(this.props.start_time)}
        </span>
      </div>
    );
  }
}

function convertDate(datestring) {
  return `${new Date(datestring).toDateString()} ${new Date(
    datestring
  ).toLocaleTimeString()}`;
}
