import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class FavoriteItem extends Component {


    render() {
        return (
            <div className='favorite-item'>
                <div className='favorite-item-link'>
                    <Link className='meeting-link' to={`/meeting/${this.props.uuid}`}>
                        <p className='favorite-topic'>{this.props.topic}</p>
                        <span className='upload-date'>{this.props.start_time}</span>
                    </Link>
                </div>
                <div className='remove-favorite-button'>
                <button className='remove-button' onClick={this.props.handleDelete} value={this.props.uuid}>X</button>
                </div>
            </div>
        )
    }
}
