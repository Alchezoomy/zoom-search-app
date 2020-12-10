import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Footer extends Component {
    render() {
        return (
                <div className='footer'>
                    <Link to='/aboutus' className='footer-link'>
                        <span className='footer-text'>
                            About the Team
                        </span>
                    </Link>
                </div>
        )
    }
}
