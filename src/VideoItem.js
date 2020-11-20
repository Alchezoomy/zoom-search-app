import React, { Component } from "react";

export default class VideoItem extends Component {
  render() {
    return (
      <div>

        <div className="video-item" style={{ backgroundColor: this.props.video.color }} >
          <div>
            <img className="profile-pic" alt={this.props.video.host_name} src={this.props.video.pic_url} />
            <p className="topic">{this.props.video.host_name}</p>
          </div>
          <p className="topic">{this.props.video.topic}</p>
          <span className="upload-date">
            {convertDate(this.props.video.start_time)}
          </span>
        </div>
      </div >
    );
  }
}

function convertDate(datestring) {
  return `${new Date(datestring).toDateString()} ${new Date(
    datestring
  ).toLocaleTimeString()}`;
}
