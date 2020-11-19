import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class FavoriteItem extends Component {


    render() {
        return (
            <div>
            <Link className='meeting-link' to={`/meeting/${this.props.uuid}`}>
                <p className='topic'>{this.props.topic}</p>
                <span className='upload-date'>{this.props.start_time}</span>
            </Link>
                <button onClick={this.props.handleDelete} value={this.props.uuid}>Remove favorite </button>
            </div>
        )
    }
}
