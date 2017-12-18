import React, { Component } from 'react';
import '../css/App.css';
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import brasilPhoto from '../assets/picture.jpg'

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
        <Card>
          <CardTitle title="What it's all about:"/>
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardMedia
            overlay={<CardTitle title="Check out the pictures in the Gallery!"/>}
          >
            <img src={brasilPhoto} alt="" className="landingPic" />
          </CardMedia>
        </Card>
      </div>

    );
  }
}

export default Home;
