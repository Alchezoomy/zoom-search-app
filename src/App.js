import React, { Component } from 'react'

import PrivateRoute from './PrivateRoute.js';

import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import './App.css';
import Header from './Header.js'
import LandingPage from './LandingPage.js'
import Student from './Student.js'
import Bookmarks from './Bookmarks.js'
import Favorites from './Favorites.js'
import VideoDetails from './VideoDetails.js'
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
      token: token,
    })
  }

  // logOut = () => {
  //   localStorage.setItem('TOKEN', '');
  //   localStorage.setItem('USERNAME', '');

  //   this.setState({
  //     username: '',
  //     token: '',

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
                <div>

                  <LandingPage

                    {...routerProps}
                    token={this.state.token}
                    changeTokenAndUsername={this.changeTokenAndUsername}
                  /></div>
              }

            />

            <PrivateRoute

              token={this.state.token}
              exact path='/student'
              render={(routerProps) =>
                <Student

                  {...routerProps}
                  token={this.state.token}
                  logOut={this.logOut}
                />
              }

            />

            <PrivateRoute
              token={this.state.token}

              exact path='/favorites'
              render={(routerProps) =>
                <Favorites
                  {...routerProps}
                  token={this.state.token}
                />
              }
            />

            <PrivateRoute
            token={this.state.token}

            exact path='/bookmarks'
            render={(routerProps) =>
              <Bookmarks
                {...routerProps}
                token={this.state.token}
              />
            }
          />

            <PrivateRoute
              token={this.state.token}

              exact path='/meeting/:id'
              render={(routerProps) =>
                <VideoDetails

                  {...routerProps}
                  token={this.state.token}
                />
              }

            />

            <Route exact path='/signup'
              render={(routerProps) =>
                <SignUp

                  {...routerProps}
                  token={this.state.token}
                  changeTokenAndUsername={this.changeTokenAndUsername}
                />
              }
            />

            <Route exact path='/aboutus'
              render={(routerProps) =>
                <AboutUs {...routerProps}
                />
              }
            />
          </Switch>
          <Footer />
        </Router>
      </div>
    )
  }
}

