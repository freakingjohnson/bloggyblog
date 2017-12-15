import React, { Component } from 'react'
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import { Tabs, Tab } from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';
import Avatar from 'material-ui/Avatar'
import author from '../assets/author.jpg'
import devPhoto from '../assets/devPhoto.jpg'
import ReactLogo from '../assets/reactlogo.png'
import NodeLogo from '../assets/nodelogo.png'
import ReduxLogo from '../assets/reduxlogo.png'
import '../css/About.css'

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

class About extends Component {
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
            <div>
                <div className="container">
                <h1 className="appName">About</h1>
                    <Tabs
                        onChange={this.handleChange}
                        value={this.state.slideIndex}
                    >
                        <Tab label="Author" value={0} />
                        <Tab label="Developer" value={1} />
                        <Tab label="Tech" value={2} />
                    </Tabs>
                    <SwipeableViews
                        index={this.state.slideIndex}
                        onChangeIndex={this.handleChange}
                    >
                        <div style={styles.slide}>
                            <Card>
                                <CardHeader
                                    title="Caroline"
                                    subtitle="Johnson"
                                    avatar={<Avatar src={author} size={90} />}
                                />
                                <CardTitle title="About the Author" />
                                <CardText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>

                            </Card>
                        </div>
                        <div style={styles.slide}>
                            <Card>
                                <CardHeader
                                    title="Nathan"
                                    subtitle="Johnson"
                                    avatar={<Avatar src={devPhoto} size={90} />}
                                />
                                <CardTitle title="About the Developer" />
                                <CardText>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>

                            </Card>

                        </div>
                        <div style={styles.slide}>
                        <Card>
                                <CardTitle title="Technologies Used:" />
                                <CardText className='contain'>
                                    <img src={ReactLogo} alt='' className='app-logo'/>
                                    <img src={NodeLogo} alt='' className='App-logo'/>
                                    <img src={ReduxLogo} alt='' className='App-logo'/>
                                </CardText>

                            </Card>
                        </div>
                    </SwipeableViews>
                </div>
            </div>
        );
    }
}


export default About