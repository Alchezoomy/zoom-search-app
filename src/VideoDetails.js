import React, { Component } from 'react'

export default class VideoDetails extends Component {
    render() {
        return (
            <div className='video-details'>
                <div className='left-nav'>
                    <div className='left-nav-text'>
                        <span className='user-email'>user@user.com</span>
                        <br />
                        <p onClick={this.props.logOut} className='logout'>Log Out</p>
                        <p className='fav'>Favorites</p>
                        <p className='arc'>Archives</p>
                    </div>
                </div>
                <div className='video-detail'>
                    <div className='video'></div>
                    <div className='chat'></div>
                </div>
                <div className='buttons'>
                    <button>Thumbs Up</button>
                    <button>Thumbs Down</button>
                    <button>Favorite</button>
                </div>
            </div>
        )
    }
}
