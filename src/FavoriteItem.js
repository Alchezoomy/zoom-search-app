import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class FavoriteItem extends Component {


    render() {
        return (
            <div>
                <div className='favorite-item'>
                    <Link className='meeting-link' to={`/meeting/${this.props.uuid}`}>
                        <p className='favorite-topic'>{this.props.topic}</p>
                        <span className='upload-date'>{this.props.start_time}</span>
                    </Link>
                </div>
                <button className='remove-favorite-button' onClick={this.props.handleDelete} value={this.props.uuid}>X</button>
            </div>
        )
    }
}
