import React, { Component } from 'react'
import fetch from 'superagent';
import {
    deleteVideo,
    fetchAllVideos,
    publishVideo
} from './Fetches.js';

export default class Teacher extends Component {
    state = {
        loading: true,
        returnedObject: {},
        allVideos: []

    }

    componentDidMount = async () => {
        const URL = 'https://alchezoomy.herokuapp.com/oauth';
        try {
            const returnedObject = await fetch.post(URL).send({ token: this.props.code });
            console.log(this.props.code);
            this.setState({
                returnedObject: returnedObject.body,
                loading: false
            })
        } catch (e) {
            throw e;
        }
    }
    componentDidMount = async () => {
        const allVideos = await fetchAllVideos()
        this.setState({
            allVideos: allVideos
        })
    }
    handleDelete = async (e) => {
        await deleteVideo(this.props.match.params.id);
    }
    handlePublsh = async (e) => {
        await publishVideo(this.props.match.params.id);
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
