import React, { Component } from 'react'
import { fetchFavorites, deleteFavoriteVideo } from './Fetches.js'
import DashMenu from './DashMenu.js'
import FavoriteList from './FavoriteList.js'



export default class Favorites extends Component {
    state = {
        loading: false,
        favorites: [],
        search: '',
        delete: false
    }

    handleDelete = async (e) => {
        await deleteFavoriteVideo(e.target.value, this.props.token);
        const favorites = await fetchFavorites(this.props.token)
        this.setState({
            favorites: favorites,
        })
    }


    componentDidMount = async () => {
        const favorites = await fetchFavorites(this.props.token)
        this.setState({
            favorites: favorites,
        })
        console.log(this.props.token)

    }

    render() {
        return (

            <div className ='favorites'>
                <div className='left-nav'>
                    <DashMenu
                    />
                </div>

            <h3 className='dashboard'>Favorites Dashboard</h3>

                <div className='video-box'>
                    {
                        this.state.loading
                            ? <img src={'/loading-spinner.gif'} alt={''} />
                            :
                            this.state.favorites.map(video =>
                                <div key={`${video.uuid}${Math.random()}`} >
                                    <FavoriteList
                                    token={this.props.token}
                                    video={video}
                                    handleDelete={this.handleDelete} />
                                </div>
                                )

                    }
                    </div>

                </div>
        )
    }
}
