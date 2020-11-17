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
        // this.props.history.push('/');
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
                        <p className='dash'>Dashboard</p>
                        <Link to={'/student'}> <p className='fav'>All Videos</p> </Link>
                        <Link to={'/favorites'}> <p className='fav'>Favorites</p> </Link>
                        <Link to={'/archives'}>  <p className='arc'>Archives</p> </Link>
                        <Link to={'/'}><p onClick={this.logOut} className='logout'>Log Out</p></Link>
                    </div>
                ) : null}
            </div>
        );
    }
}
