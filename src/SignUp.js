import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class SignUp extends Component {
    render() {
        return (
            <div className='sign-up-page'>
                <h2 className='student-signup'>Student Sign Up</h2>
                <div className='box'>
                <form>
                        <p className='email'>E-mail:</p>
                        <input></input>
                        <p className='password'>Password:</p>
                        <input type='password'></input>
                        <br />
                        <button className='signup-button'>Submit</button>
                        <br />
                        <p className='sign-up'>Already a user? <Link to='/' className='link'>Log in here</Link>.</p>
                    </form>
                </div>
            </div>
        )
    }
}
