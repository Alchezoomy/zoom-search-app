import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  //Link,
} from 'react-router-dom';
import './App.css';
import Header from './Header.js'
import LandingPage from './LandingPage.js'
import Login from './Login.js'
import Student from './Student.js'
import Teacher from './Teacher.js'
import AboutUs from './AboutUs.js'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Router>
          <Switch>
            <Route exact path='/'
            render={(routerProps) =>
            <LandingPage {...routerProps} />} />
            
            <Route exact path='/login'
            render={(routerProps) =>
            <Login {...routerProps} />} />

            <Route exact path='/student'
            render={(routerProps) =>
            <Student {...routerProps} />} />

            <Route exact path='/teacher'
            render={(routerProps) =>
            <Teacher {...routerProps} />} />

            <Route exact path='/aboutus'
            render={(routerProps) =>
            <AboutUs {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}

