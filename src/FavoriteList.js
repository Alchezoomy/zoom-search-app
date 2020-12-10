import React, { Component } from 'react'
import FavoriteItem from './FavoriteItem.js'


export default class FavoriteList extends Component {
    render() {
        return (
            <div className='video-list'>
                {/* again, seems unecessarily obfuscating to have this component wrapping another component in a div */}
                <FavoriteItem
                    handleDelete={this.props.handleDelete}
                    token={this.props.token}
                    topic={this.props.video.topic}
                    start_time={this.props.video.start_time}
                    uuid={this.props.video.uuid}
                />
            </div>
        )
    }
}
