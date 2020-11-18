import React, { Component } from 'react'
import { fetchFavorites } from './Fetches'
import DashMenu from './DashMenu.js'
import { Link } from 'react-router-dom';


export default class Favorites extends Component {
    state = {
        loading: true,
        favorites: [],
        search: '',
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
                    <div>  <Link to={`/meeting/${video.uuid}`}>

                        <div> {video.uuid} </div>
                    </Link>
                        {/* <div value={video.uuid} onClick={this.handleFavorite}>Favorite</div> */}
                    </div>


                )
                }
            </div>
        )
    }
}
