import React, { Component } from 'react'
import axios from 'axios'
import Paper from 'material-ui/Paper'
import '../css/Gallery.css'

const style = {
    // height: '80%',
    width: '27%',
    margin: 30,
    textAlign: 'center',
    // opacity: 0,
    // display: 'flex',
};
class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            imageData: undefined
        }
    }



    componentDidMount() {
        axios.get('/getimage')
            .then((res) => {
                this.setState({
                    imageData: res.data
                })
                console.log(this.state.imageData)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        const data = this.state.imageData
        console.log(data)
        let images = data && data.map(group => {
            return (
                // <div >
                    <Paper style={style} zDepth={5}>
                        {data ? <div className="imageItem" dangerouslySetInnerHTML={{ __html: group.img }} /> : undefined}
                    </Paper>
                // </div>
            )
        })
        return (
            <div className="container">
                <h1 className="appName">Galeria de Fotos</h1>
                <div className="imageContainer">
                    {images}
                </div>
            </div>

        );
    }
}

export default Gallery