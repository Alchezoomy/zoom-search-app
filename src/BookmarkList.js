import React, { Component } from 'react'
import BookmarkItem from './BookmarkItem.js'

export default class BookmarkList extends Component {
    render() {
        return (
            <div className='video-list'>
                {/* hmmm, not sure this BookmarkList component is useful if all it does is wrap another component in a div */}
                <BookmarkItem
                    id={this.props.video.id}
                    handleDelete={this.props.handleDelete}
                    token={this.props.token}
                    topic={this.props.video.topic}
                    time_start={this.props.video.time_start}
                    text={this.props.video.text}
                    uuid={this.props.video.uuid}
                />
            </div>
        )
    }
}
