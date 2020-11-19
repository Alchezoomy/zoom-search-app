import React, { Component } from 'react'
import ReactPlayer from 'react-player';

export default class Player extends Component {

    state = {
        currentTime: 1,
        timeStamp: this.props.timeStamp
    }

    ref = player => {
        this.player = player
    }

    // handleCurrentTime = () => {
    //     setInterval(() => { console.log(this.player.getCurrentTime()); }, 1000);
    // }

    componentDidMount = async () => {
        // video start time
        await this.player.seekTo(this.props.timeStamp);
        // this.handleCurrentTime();
        console.log(this.props.timeStamp)
    }
    // component = async () => {
    //     // video start time
    //     await this.player.seekTo(Math.floor(this.state.timeStamp));
    //     // this.handleCurrentTime();

    // }

    render() {
        return (
            <div>
                <ReactPlayer
                    ref={this.props.ref}
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

        )
    }
}

