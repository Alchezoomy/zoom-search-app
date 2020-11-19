import React, { Component } from 'react'
import { fetchBookmarks, deleteBookmark } from './Fetches'
import DashMenu from './DashMenu.js'
import { Link } from 'react-router-dom';


export default class Bookmarks extends Component {
    state = {
        loading: true,
        bookmarks: [],
        search: '',
        delete: false
    }

    handleDelete = async (e) => {
        await deleteBookmark(e.target.value, this.props.token);
        const bookmarks = await fetchBookmarks(this.props.token)
        this.setState({
            bookmarks: bookmarks,
        })
    }


    componentDidMount = async () => {
        const bookmarks = await fetchBookmarks(this.props.token)
        this.setState({
            bookmarks: bookmarks,
        })
        console.log(this.state.bookmarks)

    }

    render() {
        return (

            <div>
                <div className='left-nav'>
                    <DashMenu
                    />
                </div>
                {this.state.bookmarks.map(video =>
                    <div key={`${video.uuid}${Math.random()}`}>  <Link to={`/meeting/${video.uuid}`}>

                        <div> {video.topic} </div>
                        <div> {video.time_start} </div>
                        <div> {video.id} </div>

                    </Link>
                        <button onClick={this.handleDelete} value={video.id}>Remove Bookmark </button>
                    </div>


                )
                }
            </div>
        )
    }
};