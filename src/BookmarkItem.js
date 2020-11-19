import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import VideoItem from './VideoItem'


export default class BookmarkItem extends Component {


    render() {
        return (
            <div className='favorite-item'>
                <div className='favorite-item-link'>
                    <Link className='meeting-link' to={`/meeting/${this.props.uuid}?${this.props.time_start}`}>
                        <p className='favorite-topic'>{this.props.topic}</p>
                        <span className='upload-date'>{this.props.time_start}</span>
                    </Link>
                    {VideoItem.text}
                </div>
                <div className='remove-favorite-button'>
                    <button className='remove-button' onClick={this.props.handleDelete} value={this.props.id}>X</button>
                </div>
            </div>
        )
    }
}
