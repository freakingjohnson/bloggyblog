import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import 'react-quill/dist/quill.snow.css'


class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            value: '',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                    ['link', 'image'],
                    ['clean']
                ],
            },
            formats: [
                'header',
                'bold', 'italic', 'underline', 'strike', 'blockquote',
                'list', 'bullet', 'indent',
                'link', 'image'
            ],
        }
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleTextChange = this.handleTextChange.bind(this)
    }
    handleTextChange = (value) => {
        this.setState({
            text: value,
        })
    }
    handleTitleChange = (event) => {
        this.setState({
            value: event.target.value
        })
    }
    handleBlogPost = (event) => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth() + 1; //January is 0!
        let yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        today = yyyy + '-' + mm + '-' + dd;
        axios.post('/postblog', {
            body: this.state.text,
            title: this.state.value,
            date: today
        })
            .then(function (res) {
                console.log(res)
            })
            .catch(function (error) {
                console.log(error)
            })
    }
    render() {
        return (
            <div>
                <div className='title'>
                    <TextField
                        hintText="Enter Post Title Here"
                        floatingLabelText="Post Title"
                        value={this.state.value}
                        onChange={this.handleTitleChange} />
                </div>
                <ReactQuill value={this.state.text}
                    modules={this.state.modules}
                    formats={this.state.formats}
                    placeholder="start typing..."
                    onChange={this.handleTextChange}>
                </ReactQuill>
                <RaisedButton
                    onClick={this.handleBlogPost}
                    label="Save and Post"
                    primary={true}
                    icon={<i className="far fa-edit fa-fw" />}
                />
            </div >
        )
    }
}

export default TextEditor