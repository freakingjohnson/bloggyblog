import React, { Component } from 'react'
import axios from 'axios'
import { GridList, GridTile } from 'material-ui/GridList';
import Lightbox from 'react-image-lightbox'
import '../css/Gallery.css'

const styles = {
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    gridList: {
        width: 'auto',
        height: '100%',
        overflowY: 'auto',
    },
};

class Gallery extends Component {
    constructor() {
        super()
        this.state = {
            imageData: undefined,
            isOpen: false,
            photoIndex: 0,
            imageSrc: ''
        }

        this.handleClick = this.handleClick.bind(this)
    }



    handleClick(img) {
        this.setState({
            isOpen: true,
            imageSrc: img
        })
    }

    componentDidMount() {
        axios.get('/getimage')
            .then((res) => {
                this.setState({
                    imageData: res.data
                })
                // console.log(this.state.imageData)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        const data = this.state.imageData
        const imageSrc = this.state.imageSrc
        const {
            isOpen
        } = this.state
        // console.log(data)
        let tile = data && data.map(group => {
            return (
                <GridTile
                    key={group.id}
                    title={group.image_id}
                >
                    {data ? <img onClick={_ => this.handleClick(group.img)} className="imageItem" src={group.img} alt={group.image_id}/> : undefined}
                </GridTile>
            )
        })
        return (
            <div className="container" >
                <h1 className="appName">Gallery</h1>
                <div style={styles.root}>
                    <GridList
                        cellHeight={180}
                        cols={3}
                        style={styles.gridList}
                    >
                        {tile}
                    </GridList>
                </div>
                {isOpen &&
                    <Lightbox
                        mainSrc={imageSrc}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }

            </div>
        );
    }
}

export default Gallery