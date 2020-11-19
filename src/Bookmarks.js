import React, { Component } from 'react'
import { fetchBookmarks, deleteBookmark } from './Fetches'
import DashMenu from './DashMenu.js'
import { Link } from 'react-router-dom';
import BookmarkList from './BookmarkList';


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

            <h3 className='dashboard'>Bookmarks Dashboard</h3>

                <div classname='video-box'>
                    {
                        this.state.loading
                            ? <img src={'/loading-spinner.gif'} alt={''} />
                            :
                            this.state.bookmarks.map(video =>
                            <div key={`${video.uuid}${Math.random()}`}> 
                                <BookmarkList
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
};