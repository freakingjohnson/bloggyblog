import React, { Component } from "react"
import AppBar from 'material-ui/AppBar'
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Toggle from 'material-ui/Toggle'
import brazilVideo from '../assets/background1.mp4';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import barTheme from './barTheme'
// import ReactPlayer from 'react-player'
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
    style: {
        position: 'fixed',
    }
};
export default class Sidebar extends Component {
    constructor() {
        super()
        this.state = {
            open: false,
            playing: true,
            icon: <i className="fa fa-play" aria-hidden="true"></i>
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
    }


    handleToggle() {
        this.setState({
            playing: !this.state.playing,
            icon: <i className="fa fa-pause" aria-hidden="true"></i>
        })
        if (this.state.playing === true) {
            this.refs.vidRef.pause();
            this.setState({
                playing: false
            })
        } else {
            this.refs.vidRef.play()
            this.setState({
                icon: <i className="fa fa-play" aria-hidden="true"></i>,
                playing: true
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

    ref = player => {
        this.player = player
    }
    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme(barTheme)}>
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
                        open={this.state.open}
                        docked={false}
                        onRequestChange={(open) => this.setState({ open })}
                    >
                        <MenuItem onClick={this.handleClose}> <a id="home" className="bm-item-list" href="/#/"><i className="fa fa-home fa-fw" aria-hidden="true" /> Home</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="blog" className="bm-item-list" href="/#/blog"><i className="fa fa-book fa-fw" aria-hidden="true" /> Blog</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="discussion" className="bm-item-list" href="/#/discussion"><i className="fa fa-envelope fa-fw" aria-hidden="true" /> Discussion</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="gallery" className="bm-item-list" href="/#/gallery"><i className="fa fa-picture-o fa-fw" aria-hidden="true" /> Gallery</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="about" className="bm-item-list" href="/#/about"><i className="fa fa-info-circle fa-fw" aria-hidden="true" /> About</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="admin" className="bm-item-list" href={process.env.REACT_APP_LOGIN}><i className="fa fa-lock fa-fw" aria-hidden="true" /> Admin</a> </MenuItem>
                    </Drawer>
                    <div>
                        <div className='layer' />
                        <video ref="vidRef" className='background-video' autoPlay loop muted
                        src={brazilVideo} type='video/mp4' />
                        {/* <ReactPlayer
                            ref={this.ref}
                            // "vidRef"
                            className='background-video'
                            playing={this.state.playing}
                            loop={true}
                            width='100%'
                            height='100%'
                            
                            // playsinline={true}
                            muted
                            url=
                            // {brazilVideo}
                            'https://youtu.be/DTk72db-7CA'
                            type='video/mp4'
                        /> */}
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}