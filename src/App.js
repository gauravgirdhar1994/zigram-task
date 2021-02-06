import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Cocktails from './Cocktails'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";


class App extends Component {
  render() {
    console.log("Host URL"+process.env.PUBLIC_URL);
    return (

      <Router basename={process.env.PUBLIC_URL}>
        <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Cocktail List</h1>
        </header>
          <Switch>
                <Route exact path= "/" render={() => (
                  <Redirect to="/cocktailList"/>
                )}/>
                 <Route exact path='/cocktailList' component={Cocktails} />
          </Switch>
      </div>
    </Router>
    );
  }
}

export default App;
