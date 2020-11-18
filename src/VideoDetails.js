import React, { Component } from 'react'
import DashMenu from './DashMenu.js'
import Player from './Player.js'
import {

    fetchVideo,
    favoriteVideo,
    fetchTranscript


} from './Fetches.js';

export default class VideoDetails extends Component {

    state = {
        loading: true,
        video: [],
        search: '',
        transcript: []
    }

    componentDidMount = async () => {
        const video = await fetchVideo(this.props.match.params.id, this.props.token);
        const transcript = await fetchTranscript(this.props.match.params.id, this.props.token);
        this.setState({
            video: video,
            transcript: transcript,
        })
    }


    handleFavorite = async (e) => {

        const newFavorite = {
            uuid: 10,
            host_id: this.state.video.host_id,
            topic: this.state.video.topic,
            start_time: 4,
            timestamp: 4,
            speaker: "",
            text: "",
            owner_id: this.state.video.owner_id

        }
        await favoriteVideo(newFavorite, this.props.token);

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
                            video_url={this.state.video.video_play_url} />

                        <div>{this.state.transcript.map(trans =>
                            <div>{trans.text}</div>
                        )}
                        </div>
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
