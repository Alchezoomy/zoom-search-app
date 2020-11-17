import React, { Component } from 'react'

export default class DashMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        }

        this.togglePanel = this.togglePanel.bind(this);
    }

    togglePanel(e){
        this.setState({open: !this.state.open})
    }

    render() {
        return (
            <div>
                <div onClick={(e) => this.togglePanel(e)} className='dash-menu'><span className='menu-icon'>+</span></div>
                {this.state.open ? (
                        <div className='content'>
                            <p className='dash'>Dashboard</p>
                            <p className='fav'>Favorites</p>
                            <p className='arc'>Archives</p>
                            <p onClick={this.props.logOut} className='logout'>Log Out</p>
                        </div>
                        ): null}
            </div>
        );
    }
}
