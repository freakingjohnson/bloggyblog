import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardText } from 'material-ui/Card';
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
import cloudinary from 'cloudinary';
import '../css/quill.snow.css'
import '../css/CreateBlog.css'

class DeleteImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            index: 0,
            length: undefined,
            imageData: undefined,
            nextButton: true,
            previousButton: false,
            imageId: undefined,
            publicId: '',
        }
        this.handleNext = this.handleNext.bind(this)
        this.handlePrevious = this.handlePrevious.bind(this)
        this.handleImageDelete = this.handleImageDelete.bind(this)
    }
    handleNext() {
        this.setState({
            index: this.state.index - 1
        })
        this.getImage()
    }

    handlePrevious() {
        this.setState({
            index: this.state.index + 1
        })
        this.getImage()
    }

    handleImageDelete = (event) => {
        let publicId = this.state.publicId
        console.log(this.state.publicId, 'public id')
        axios.delete('/deleteimage/' + this.state.imageId
        ).then(function (res) {
            cloudinary.v2.uploader.destroy(publicId,
                {
                    api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
                    api_secret: "k5NqZfLujUP3Wc58mnyD89rj-HQ",
                    cloud_name: "freakingjohnson"
                },
                (error, result) => {
                    if (error) {
                        // TODO: LOG ERRORS REMOTELY;
                        console.log(error);
                    } else if (result) {
                        // TODO: LOG SUCCESSFUL DELETES
                        console.log(result);
                    }
                },
            )
            console.log(res)
        }).catch(function (error) {
            console.log(error)
            alert("error! try again")
        })
        this.getImage()
        this.setState({
            open: true,
        })
    }

    getImage = () => {
        axios.get('/getimage')
            .then((res) => {
                this.setState({
                    imageData: res.data[this.state.index].img,
                    length: res.data.length,
                    imageId: res.data[this.state.index].id,
                    publicId: res.data[this.state.index].public_id
                })
                console.log(res)
                if (this.state.index === 0) {
                    this.setState({
                        nextButton: true,
                        previousButton: false
                    })
                } else if (this.state.index === this.state.length - 1) {
                    this.setState({
                        previousButton: true
                    })

                } else {
                    this.setState({
                        nextButton: false,
                        previousButton: false,
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }

    componentDidMount = () => {
        this.getImage()
    }

    render() {
        return (
            <div className="imageContainer">
                <div className='imageDeleteContainer'>
                    <h1>Delete Image</h1>
                    <Card className='imageDeleteCard'>
                        <CardText>
                            <img src={this.state.imageData} alt='' />
                        </CardText>
                    </Card>
                </div>
                <RaisedButton
                    className="prevButton"
                    onClick={this.handlePrevious}
                    label="Prev"
                    secondary={true}
                    disabled={this.state.previousButton}
                    icon={<i className="fa fa-chevron-left fa-fw" />}
                />
                <RaisedButton
                    className="nextButton"
                    onClick={this.handleNext}
                    label="Next"
                    primary={true}
                    labelPosition="before"
                    disabled={this.state.nextButton}
                    icon={<i className="fa fa-chevron-right fa-fw" />}
                />
                <RaisedButton
                    className="deleteButton"
                    onClick={this.handleImageDelete}
                    label="Delete"
                    primary={false}
                    icon={<i className="fa fa-trash fa-fw" />}
                />
                <Snackbar
                    open={this.state.open}
                    message="Image Deleted!"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div >
        )
    }
}

export default DeleteImage