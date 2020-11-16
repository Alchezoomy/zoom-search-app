import React, { Component } from 'react'

export default class TeacherLogin extends Component {


    componentDidMount = async () => {
        let code = new URLSearchParams(window.location.search);

        this.props.handleSetState({ code: code.get('code') });
        this.props.history.push('/teacher');
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}
