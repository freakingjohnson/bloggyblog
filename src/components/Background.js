import React, { Component } from 'react'
import '../css/Background.css'
import brazilVideo from '../assets/background.mp4';
import Toggle from 'material-ui/Toggle';

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
        backgroundColor: 'red',
    },
    trackSwitched: {
        backgroundColor: '#ff9d9d',
    },
    labelStyle: {
        color: 'black',
    },
};

class Background extends Component {
    constructor() {
        super()
        this.state = {
            videoPlaying: true,
            icon: <i className="fa fa-play" aria-hidden="true"></i>
        }
        this.handleToggle = this.handleToggle.bind(this)
        this.handleIcon = this.handleIcon.bind(this)
    }

    handleIcon() {
        // this.setState({
        //     icon: <i class="fa fa-pause" aria-hidden="true"></i>
        // })
        if (this.state.videoPlaying === true){
            this.setState({
                icon: <i className="fa fa-pause" aria-hidden="true"></i>
            })
        }else{
            this.setState({
                icon: <i className="fa fa-play" aria-hidden="true"></i>
            })
        }
    }

    handleToggle() {
        this.setState({
            videoPlaying: !this.state.videoPlaying
        })
        if (this.state.videoPlaying === true) {
            this.refs.vidRef.pause();
        } else {
            this.refs.vidRef.play()
        }

    }
    render() {
        return (
            <div>
                <div className='toggleContainer'>
                    <Toggle
                        className='toggle'
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
                    />
                </div>
                <div className='layer' />
                <video ref="vidRef" className='background-video' autoPlay loop muted
                    src={brazilVideo} type='video/mp4' />

            </div>
        )
    }
}
export default Background