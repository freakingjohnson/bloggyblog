import React, { Component } from 'react';
import ReactQuill from 'react-quill'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';


class ImageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            imageName: '',
            open: false,
            modules: {
                toolbar: [
                    ['image'],
                ],
            }
        }
        this.handleImageName = this.handleImageName.bind(this)
        this.handleImageChange = this.handleImageChange.bind(this)
    }

    handleImageName = (event) => {
        this.setState({
            imageName: event.target.value
        })
    }
    handleImageChange = (value) => {
        this.setState({
            image: value,
        })
    }
    handleImagePost = (event) => {
        axios.post('/postimage', {
            image: this.state.image.slice(13, -6),
            title: this.state.imageName,
        }).then(function (res) {
            console.log(res)
        }).catch(function (error) {
            console.log(error)
            alert('Error')
        })
        this.setState({
            image: '',
            imageName: '',
            open: true,
        })
    }
    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div>
                <TextField
                    primary="true"
                    hintText="Enter Image Name Here"
                    floatingLabelText="Image Name"
                    value={this.state.imageName}
                    onChange={this.handleImageName} />
                <ReactQuill value={this.state.image}
                    modules={this.state.modules}
                    // formats={this.state.formats}
                    placeholder="upload an image..."
                    onChange={this.handleImageChange}>
                </ReactQuill>
                <RaisedButton
                    onClick={this.handleImagePost}
                    label="Post Image"
                    primary={true}
                    icon={<i className="fa fa-picture-o fa-fw" />}
                />
                <Snackbar
                    open={this.state.open}
                    message="Image Posted!"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        )
    }
}

export default ImageUpload