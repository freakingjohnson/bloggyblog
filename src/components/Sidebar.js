import React, { Component } from "react"
import AppBar from 'material-ui/AppBar'
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle'
import brazilVideo from '../assets/background.mp4';
import "../css/Sidebar.css"


const styles = {
    block: {
        maxWidth: 250,
    },
    toggle: {
        marginBottom: 16,
    },
    thumbOff: {
        backgroundColor: '#ffcccc',
    },
    trackOff: {
        backgroundColor: '#ff9d9d',
    },
    thumbSwitched: {
        backgroundColor: 'darkred',
    },
    trackSwitched: {
        backgroundColor: '#ff9d9d',
    },
    labelStyle: {
        color: 'black',
    },
};
export default class Sidebar extends Component {
    constructor() {
        super()

        this.state = {
            open: false,
            videoPlaying: true,
            icon: <i className="fa fa-play" aria-hidden="true"></i>
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }


    handleToggle() {
        this.setState({
            videoPlaying: !this.state.videoPlaying,
            icon: <i className="fa fa-pause" aria-hidden="true"></i>
        })
        if (this.state.videoPlaying === true) {
            this.refs.vidRef.pause();
        } else {
            this.refs.vidRef.play()
            this.setState({
                icon: <i className="fa fa-play" aria-hidden="true"></i>
            })
        }
    }

    handleOpen() {
        this.setState({
            open: !this.state.open
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>
                <AppBar
                    title="bloggyblogblog"
                    iconElementLeft={<IconButton onClick={this.handleOpen}><MenuIcon /></IconButton>} // Shows the delete icon next to the title
                    showMenuIconButton={true} // Shows the hamburger menu on the left of the title
                    iconElementRight={<Toggle
                        label={this.state.icon}
                        defaultToggled={true}
                        onToggle={this.handleToggle}
                        onClick={this.handleIcon}
                        labelPosition="left"
                        thumbStyle={styles.thumbOff}
                        trackStyle={styles.trackOff}
                        thumbSwitchedStyle={styles.thumbSwitched}
                        trackSwitchedStyle={styles.trackSwitched}
                        labelStyle={styles.labelStyle}
                    />}
                    className='bar'
                />
                <Drawer
                    open={this.state.open} // remove to make the drawer always present
                    // openSecondary={true} // opens on the right side of the screen
                    // width={300} // sets custom width
                    docked={false} // allows for overlay (can click away, or press escape to close menu)
                    onRequestChange={(open) => this.setState({ open })} // doesn't do much on it's own. Pair with docked
                >
                    <MenuItem onClick={this.handleClose}> <a id="home" className="bm-item-list" href="/#/"><i className="fa fa-home fa-fw" aria-hidden="true" /> Home</a> </MenuItem>
                    <MenuItem onClick={this.handleClose}> <a id="blog" className="bm-item-list" href="/#/blog"><i className="fa fa-book fa-fw" aria-hidden="true" /> Blog</a> </MenuItem>
                    <MenuItem onClick={this.handleClose}> <a id="gallery" className="bm-item-list" href="/#/gallery"><i className="fa fa-picture-o fa-fw" aria-hidden="true" /> Gallery</a> </MenuItem>
                    <MenuItem onClick={this.handleClose}> <a id="about" className="bm-item-list" href="/#/about"><i className="fa fa-info-circle fa-fw" aria-hidden="true" /> About</a> </MenuItem>
                    <MenuItem onClick={this.handleClose}> <a id="discussion" className="bm-item-list" href="/#/discussion"><i className="fa fa-envelope fa-fw" aria-hidden="true" /> Discussion</a> </MenuItem>
                    <MenuItem onClick={this.handleClose}> <a id="admin" className="bm-item-list" href="http://localhost:3005/login"><i className="fa fa-lock fa-fw" aria-hidden="true" /> Admin</a> </MenuItem>
                </Drawer>
                <div>
                    <div className='layer' />
                    <video ref="vidRef" className='background-video' autoPlay loop muted
                        src={brazilVideo} type='video/mp4' />
                </div>
            </div>
        )
    }
}