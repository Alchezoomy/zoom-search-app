import React, { Component } from 'react'
import DashMenu from './DashMenu.js'
import Player from './Player.js'
import {

    fetchVideo,
    favoriteVideo,
    // searchPublishedVideos,


} from './Fetches.js';

export default class VideoDetails extends Component {

    state = {
        loading: true,
        video: [],
        search: '',
    }

    componentDidMount = async () => {
        const video = await fetchVideo(this.props.match.params.id, this.props.token)
        this.setState({
            video: video,
        })
    }
    handleFavorite = async (e) => {
        await favoriteVideo(this.state.video, this.props.token);

    }
    render() {
        return (
            <div className='video-details'>

                <div className='left-nav'>
                    <DashMenu
                    />
                </div>
                <h3 className='video-header'>{this.state.video.topic}</h3>
                <div className='video-detail'>
                    <div className='video'>
                        <Player
                            video_url={this.state.video.video_play_url} 
                            />
                    </div>

                    <div className='chat'></div>
                </div>
                <div className='buttons'>
                    <button className="thumbs-up">Like</button>
                    <button className="thumbs-down">Dislike</button>
                    <button onClick={this.handleFavorite} className='favorite-button'>Favorite</button>
                </div>
            </div>
        )
    }
}
