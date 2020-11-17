import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DashMenu from './DashMenu.js'

import {

    fetchPublishedVideos,
    favoriteVideo,
    searchPublishedVideos,


} from './Fetches.js';

export default class Student extends Component {

    state = {
        loading: true,
        allVideos: [],
        search: '',
    }


    componentDidMount = async () => {
        const allVideos = await fetchPublishedVideos(this.props.token)
        this.setState({
            allVideos: allVideos
        })
    }
    handleFavorite = async (e) => {
        await favoriteVideo(e.target.value, this.props.token);

    }

    handleSearch = async (e) => {
        e.preventDefault()
        await searchPublishedVideos(this.state.search, this.props.token);

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
                        <option >Favorites</option>
                    </select>
                </div>
                <div className='video-list'>
                    {this.state.allVideos.map(video =>
                        <div>  <Link to={`/meeting/${video.uuid}`}>

                            <div> {video.uuid} </div>
                        </Link>
                            {/* <div value={video.uuid} onClick={this.handleFavorite}>Favorite</div> */}
                        </div>


                    )
                    }
                </div>
            </div>
        )
    }
}
