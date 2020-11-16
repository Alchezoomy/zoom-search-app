import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class LandingPage extends Component {

    render() {
        return (
            <div className='landing'>
                <h1 className='landing-tagline'>Never miss a beat.</h1>
                <h2 className='landing-description'>Upload searchable Zoom videos and chat logs for easy reference.</h2>
                <div className='box'>
                    <a href='https://zoom.us/oauth/authorize?response_type=code&client_id=AxrbH83_Q0aEO273dFIafw&redirect_uri=https://alchezoomy.netlify.app/redirect/'><button className='teacher-button'>Teacher Login</button></a>
                    <br />
                    <Link to='/login'><button className='student-button'>Student Login</button></Link>
                </div>
            </div>
        )
    }
}
