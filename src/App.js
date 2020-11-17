import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import Header from './Header.js'
import LandingPage from './LandingPage.js'
import Student from './Student.js'
import SignUp from './SignUp.js'
import AboutUs from './AboutUs.js'
import Footer from './Footer';

export default class App extends Component {
  state = {
    code: '',
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTokenAndUsername = (name, token) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USERNAME', name);

    this.setState({
      username: name,
      token: token
    })
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: '',


    })
    this.props.history.push('/')
  }


  handleSetState = (stateObject) => {
    this.setState(stateObject);
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path='/'
              render={(routerProps) =>
                <LandingPage
                  changeTokenAndUsername={this.changeTokenAndUsername}
                  {...routerProps} />} />

            <Route exact path='/student'
              render={(routerProps) =>
                <Student
                  token={this.state.token}
                  logOut={this.logOut}
                  {...routerProps} />}
            />

            <Route exact path='/signup'
              render={(routerProps) =>
                <SignUp
                  changeTokenAndUsername={this.changeTokenAndUsername}
                  {...routerProps} />} />

            <Route exact path='/aboutus'
              render={(routerProps) =>
                <AboutUs {...routerProps} />} />
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

