import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Components/Home';
import Reports from './Components/Reports/Reports';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <div className="navbar">
            <div className="navbar-title">Analytics</div>
          </div>
          <Route path="/" component={Home} exact/>
          <Route path="/reports" component={Reports}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
