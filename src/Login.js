import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Login extends Component {
    render() {
        return (
            <div className='login'>
                <h2 className='student-login'>Student Login</h2>
                <div className='box'>
                    <form>
                        <p className='email'>E-mail:</p>
                        <input></input>
                        <p className='password'>Password:</p>
                        <input type='password'></input>
                        <br />
                        <button className='login-button'>Submit</button>
                        <br />
                        <p className='sign-up'>Not a user? <Link to='/signup' className='link'>Sign up here</Link>.</p>
                    </form>
                </div>
            </div>
        )
    }
}
