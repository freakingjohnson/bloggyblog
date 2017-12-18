import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardText } from 'material-ui/Card';
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
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
        }
        this.handleNext = this.handleNext.bind(this)
        this.handlePrevious = this.handlePrevious.bind(this)
        this.handleImageDelete = this.handleImageDelete.bind(this)
    }
    handleNext() {
        this.setState({
            index: this.state.index - 1
        })
        axios.get('/getimage')
            .then((res) => {
                this.setState({
                    imageData: res.data[this.state.index].img,
                    length: res.data.length,
                    imageId: res.data[this.state.index].id,
                })
                // console.log(this.state.blogData)
                if (this.state.index === 0) {
                    this.setState({
                        nextButton: true
                    })
                } else {
                    this.setState({
                        nextButton: false
                    })
                }
                if (this.state.index === this.state.length - 1) {
                    this.setState({
                        previousButton: true
                    })
                } else {
                    this.setState({
                        previousButton: false
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        console.log(this.state.index)
    }
    handlePrevious() {
        this.setState({
            index: this.state.index + 1
        })
        axios.get('/getimage')
            .then((res) => {
                this.setState({
                    imageData: res.data[this.state.index].img,
                    length: res.data.length,
                    imageId: res.data[this.state.index].id,
                })
                // console.log(this.state.blogData)
                if (this.state.index === 0) {
                    this.setState({
                        nextButton: true
                    })
                } else {
                    this.setState({
                        nextButton: false
                    })
                }
                if (this.state.index === this.state.length - 1) {
                    this.setState({
                        previousButton: true
                    })
                } else {
                    this.setState({
                        previousButton: false
                    })
                }
            })
            .catch(function (error) {
                console.log(error)
            })
        console.log(this.state.index)
    }

    handleImageDelete = (event) => {
        console.log(this.state.imageId, 'image id')
        axios.delete('/deleteimage/' + this.state.imageId
        ).then(function (res) {
            console.log(res)
        }).catch(function (error) {
            console.log(error)
            alert("error! try again")
        })
        axios.get('/getimage')
            .then((res) => {
                this.setState({
                    imageData: res.data[this.state.index].img,
                    length: res.data.length,
                    imageId: res.data[this.state.index].id,
                })
                console.log(this.state.imageData)
                console.log(this.state.length)
                console.log(this.state.index)
            })
            .catch(function (error) {
                console.log(error)
            })
        this.setState({
            open: true,
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    }

    componentDidMount() {
        axios.get('/getimage')
            .then((res) => {
                this.setState({
                    imageData: res.data[this.state.index].img
                })
                // console.log(this.state.imageData)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div className='imageDeleteContainer'>
                <Card className='imageDeleteCard'>
                    <CardText>
                        <h1>Delete Image</h1>
                        <img src={this.state.imageData} alt=''/>
                    </CardText>
                </Card>
                <RaisedButton
                    onClick={this.handlePrevious}
                    label="Previous"
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
                    label="Delete Image"
                    secondary={true}
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