import React, { Component } from 'react';
import '../css/App.css';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Avatar from 'material-ui/Avatar'
import author from '../assets/author.jpg'
import devPhoto from '../assets/devPhoto.jpg'

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };
  render() {
    return (
      <div className="container">
        <h1 className="appName">Bem-vindo</h1>
      </div>

    );
  }
}

export default Home;
