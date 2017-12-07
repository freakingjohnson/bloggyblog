import React, { Component } from 'react'
import '../css/Background.css'
import brazilVideo from '../assets/background.mp4';

class Background extends Component {
    render() {
        return (
            <div>
                <div className='layer' />
                    <video className='background-video' autoPlay loop muted>
                    <source src={brazilVideo} type='video/mp4' />
                </video>
            </div>
        )
    }
}
export default Background