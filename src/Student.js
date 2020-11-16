import React, { Component } from 'react'

export default class Student extends Component {
    render() {
        return (
            <div className='student-dashboard'>
                    <div className='left-nav'>
                        <div className='left-nav-text'>
                            <span className='user-email'>user@user.com</span>
                            <br />
                            <p className='logout'>Log Out</p>
                            <p className='fav'>Favorites</p>
                            <p className='arc'>Archives</p>
                        </div>
                    </div>
                    <h3 className='dashboard'>Student Dashboard</h3>
                    <div className='search-and-sort'
    >                    <form>
                            <input className='searchbar' />
                            <button className='search'>Search</button>
                        </form>
                            <select className='sort'>
                                <option value='none'>Sort Videos By...</option>
                                <option>Date</option>
                                <option>Host</option>
                                <option>Favorites</option>
                            </select>
                    </div>
                    <div className='video-list'>
                        List of videos
                    </div>
            </div>
        )
    }
}
