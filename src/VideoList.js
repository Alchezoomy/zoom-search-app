import React, { Component } from 'react';
import VideoItem from './VideoItem.js';
import { Link } from 'react-router-dom';

export default class VideoList extends Component {
    render() {
        return (
            <div className='video-list'>
                <Link className='meeting-link' to={`/meeting/${this.props.video.id}`}>
                    <VideoItem
                        video={this.props.video}
                    />
                </Link>
            </div>
        )
    }
}
