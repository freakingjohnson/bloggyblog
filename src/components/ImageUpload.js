import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
import Dropzone from 'react-dropzone'



class ImageUpload extends Component {
    constructor(props) {
        super(props)
        this.state = {
            image: '',
            imageName: '',
            fileURL: '',
            publicId: '',
            open: false,
        }
        this.handleImageName = this.handleImageName.bind(this)
    }

    handleImageName = (event) => {
        this.setState({
            imageName: event.target.value
        })
    }

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    handleUpload = (event) => {
        console.log(this.state.image)
        let uploaders = this.state.image.map(image => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", image);
            formData.append("tags", `blogpictures`);
            formData.append("upload_preset", "efvqy0li"); // Replace the preset name with your own
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_API_KEY); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);
            return axios.post("https://api.cloudinary.com/v1_1/freakingjohnson/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app
                const publicId = data.public_id
                this.setState({
                    fileURL: fileURL,
                    publicId: publicId
                })
                console.log(this.state)
                axios.post('/postimage', {
                    image: this.state.fileURL,
                    title: this.state.imageName,
                    publicId: this.state.publicId
                }).then(function (res) {
                    console.log(res)
                }).catch(function (error) {
                    console.log(error)
                    alert('Error')
                })
                console.log(data);
                this.setState({
                    image: '',
                    imageName: '',
                    open: true,
                    fileURL: ''
                })
            })
        })
    };


    onDrop = (image) => {
        this.setState({
            image: image
        });
        console.log(this.state.image)
    }

    render() {
        const {
            image
        } = this.state
        console.log(image)
        return (
            <div>
                <div className="quill">
                    <h1>Upload Image to Gallery</h1>
                    <TextField
                        primary="true"
                        hintText="Enter Image Name Here"
                        floatingLabelText="Image Name"
                        value={this.state.imageName}
                        onChange={this.handleImageName} />
                    <Dropzone
                        // maxSize={500000}
                        onDrop={this.onDrop.bind(this)}
                        name={this.state.imageName}
                        // onDropAccepted={onDropAccepted}
                        // onDropRejected={this.onDropRejected}
                        multiple={false}
                    >
                        <p>drop file here</p>
                    </Dropzone>
                    {image ? <img src={image[0].preview} alt=''/> : undefined}
                </div>
                <RaisedButton
                    onClick={this.handleUpload}
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