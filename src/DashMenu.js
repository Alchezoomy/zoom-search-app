import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class DashMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }

        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e) {
        this.setState({ open: !this.state.open })
    }
    logOut = () => {
        localStorage.setItem('TOKEN', '');
        localStorage.setItem('USERNAME', '');
        this.setState({
            username: '',
            token: '',
        })

    }
    render() {
        return (
            <div>
                <div onClick={(e) => this.togglePanel(e)} className='dash-menu'><span className='menu-icon'>+</span></div>
                {this.state.open ? (
                    <div className='content'>
                        <Link to={'/student'} className='dash'> <p>Dashboard</p> </Link>
                        <Link to={'/favorites'} className='fav'> <p>Favorites</p> </Link>
                        <Link to={'/archives'} className='arc'>  <p>Archives</p> </Link>
                        <Link to={'/'} className='logout'><p onClick={this.logOut}>Log Out</p></Link>
                    </div>
                ) : null}
            </div>
        );
    }
}
