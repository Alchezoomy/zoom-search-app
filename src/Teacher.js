import React, { Component } from 'react'

export default class Teacher extends Component {
    state = {
        loading: true,
        returnedObject: {}
    }

    componentDidMount = async () => {
        const URL = 'https://alchezoomy.herokuapp.com/oauth';
        try {
            const returnedObject = await fetch.post(URL).send({ token: this.props.baseState.code });
            this.setState({
                returnedObject: returnedObject.body,
                loading: false
            })
        } catch(e) {
            throw e;
        }
    }
    render() {
        return (
            <div className='teacher'>
                {this.state.loading
                ? <img src='/loading-spinner.gif' alt='loading spinner' />
                : <p>test passed</p>
                }
            </div>
        )
    }
}
