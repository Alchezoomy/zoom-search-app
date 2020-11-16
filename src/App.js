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
    code: ''
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
            <LandingPage {...routerProps} />} />

            <Route exact path='/student'
            render={(routerProps) =>
            <Student {...routerProps} />} />

            <Route exact path='/signup'
            render={(routerProps) =>
            <SignUp {...routerProps} />} />

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

