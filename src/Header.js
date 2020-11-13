import React, { Component } from 'react'
import './App.css';

export default class Header extends Component {
    render() {
        return (
            <div className='header'>
                <span className='alchezoomy'>Alche<img className='zoom-logo' src='/ZoomLogo.png' alt='Zoom logo'/>y</span>
            </div>
        )
    }
}
