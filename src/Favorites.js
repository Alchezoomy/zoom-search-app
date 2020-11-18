import React, { Component } from 'react'
import { fetchFavorites, deleteFavoriteVideo } from './Fetches'
import DashMenu from './DashMenu.js'
import { Link } from 'react-router-dom';


export default class Favorites extends Component {
    state = {
        loading: true,
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
    }
    render() {
        return (

            <div>
                <div className='left-nav'>
                    <DashMenu
                    />
                </div>
                {this.state.favorites.map(video =>
                    <div>  <Link to={`/meeting/${video.topic}`}>

                        <div> {video.uuid} </div>
                    </Link>
                        <button onClick={this.handleDelete} value={video.uuid}>Remove favorite </button>
                    </div>


                )
                }
            </div>
        )
    }
}
