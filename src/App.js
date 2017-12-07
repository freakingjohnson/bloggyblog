import React, { Component } from 'react';
// import { Link } from 'react-router-dom'
import './css/App.css';
import Sidebar from './components/Sidebar'
import Background from './components/Background'

class App extends Component {
  render() {
    return (
      <div>

        <Sidebar />
        <Background />
        
        <header className="appName">Hello</header>
      </div>

    );
  }
}

export default App;
