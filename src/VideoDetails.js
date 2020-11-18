import React, { Component } from 'react'
import DashMenu from './DashMenu.js'
import Player from './Player.js'
import {

    fetchVideo,
    favoriteVideo,
    fetchTranscript,
    fetchChat

} from './Fetches.js';

export default class VideoDetails extends Component {

    state = {
        loading: false,
        video: [],
        search: '',
        transcript: [],
        chats: []
    }

    componentDidMount = async () => {
        await this.setState({ loading: true });
        const video = await fetchVideo(this.props.match.params.id, this.props.token);

        const transcript = await fetchTranscript(this.props.match.params.id, this.props.token);

        const chats = await fetchChat(this.props.match.params.id, this.props.token);

        this.setState({
            video: video,
            transcript: transcript,
            chats: chats,
            loading: false
        })
    }


    handleFavorite = async (e) => {

        const newFavorite = {
            uuid: this.state.video.uuid,
            host_id: this.state.video.host_id,
            topic: this.state.video.topic,
            start_time: this.state.video.start_time,
            timestamp: this.state.video.timestamp,
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
                <div className='chat'>{this.state.chats.map(chat =>
                        <div>{chat.timestamp} {chat.speaker} {chat.text}</div>
                        )}
                    </div>

                    </div>
                    <h3 className='video-header'>{this.state.video.topic}</h3>
                    <div className='video-detail'>
                        <div className='video'>
                            <Player
                                video_url={this.state.video.video_play_url} />

                        </div>
                    </div>

                    <div className='buttons'>
                        <button onClick={this.handleFavorite} className='favorite-button'>Favorite</button>
                        <button className="bookmarks">Bookmark Timestamp</button>
                    </div>
                    {
                        this.state.loading
                            ? <img src={'/loading-spinner.gif'} alt={''} />
                            : <div className='transcript'>{this.state.transcript.map(trans =>
                                <div>({trans.time_start}) {trans.text}</div>
                            )}
                            </div>

                    }
                </div>
                <div className='chat'>{this.state.chats.map(chat =>
                    <div>{chat.timestamp} {chat.speaker} {chat.text}</div>
                )}
                </div>
\
            </div>
        )
    }
}
