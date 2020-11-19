import React, { Component } from 'react';
import VideoList from './VideoList.js';
import DashMenu from './DashMenu.js';

import {

    fetchPublishedVideos,
    favoriteVideo,
    searchPublishedVideos,


} from './Fetches.js';

export default class Student extends Component {

    state = {
        loading: false,
        allVideos: [],
        search: '',
    }

    componentDidMount = async () => {
        await this.setState({ loading: true });

        const allVideos = await fetchPublishedVideos(this.props.token)
        this.setState({
            allVideos: allVideos,
            loading: false
        })
    }
    handleFavorite = async (e) => {
        await favoriteVideo(e.target.value, this.props.token);
    }

    handleSearch = async (e) => {
        e.preventDefault()
        const search = await searchPublishedVideos(this.state.search, this.props.token);
        this.setState({
            allVideos: search
        })
    }

    render() {
        return (
            <div className='student-dashboard'>
                <div className='left-nav'>
                    <DashMenu />
                </div>
                <h3 className='dashboard'>Student Dashboard</h3>
                <div className='search-and-sort'>
                    <form onSubmit={this.handleSearch}>
                        <input onChange={e => this.setState({ search: e.target.value })} type="text" className='searchbar' />
                        <button className='search'>Search</button>
                    </form>
                    <select className='sort'>
                        <option value='none'>Sort Videos By...</option>
                        <option>Date</option>
                        <option>Host</option>
                        <option>Favorites</option>
                    </select>
                </div>
                <div className='video-box'>
                    {
                        this.state.loading
                            ? <img src={'/loading-spinner.gif'} alt={''} />
                            :
                            this.state.allVideos.map(video =>
                                <div key={`${video.uuid}${Math.random()}`} >
                                    <VideoList
                                        video={video} />
                                </div>
                            )

                    }
                </div>
            </div>
        )
    }
}
