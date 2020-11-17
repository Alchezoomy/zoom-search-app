import React, { Component } from 'react'
import { fetchFavorites } from './Fetches'
import DashMenu from './DashMenu.js'

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
                    <div>

                        <div> {video.uuid} </div>

                    </div>


                )
                }
            </div>
        )
    }
}
