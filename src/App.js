import Header from './componant/Header';
import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { withAuth0 } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './componant/Main';
import Fav from './componant/Fav';


class App extends Component {
  render() {
    return (
     <Router>
       {this.props.auth0.isAuthenticated ?
       <Header
       isAuthenticated={this.props.auth0.isAuthenticated}
            myPic={this.props.auth0.user.picture}
            myName={this.props.auth0.user.name}
            myEmail={this.props.auth0.user.email}/>
           : <Header/>
       }
       <Switch>
          <Route exact path="/">
            <Main />
            </Route>
            <Route path="/profile">
            <Fav />
          </Route>
        </Switch>
     </Router>
    )
  }
 }
 export default withAuth0(App);
 