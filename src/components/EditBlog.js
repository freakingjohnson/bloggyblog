import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import axios from 'axios'
import Snackbar from 'material-ui/Snackbar';
import '../css/quill.snow.css'
import '../css/CreateBlog.css'

class EditBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            index: 0,
            length: undefined,
            blogData: undefined,
            blogTitle: '',
            blogDate: undefined,
            nextButton: true,
            previousButton: false,
            blogId: undefined,
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, false] }],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    // [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
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
        this.handleNext = this.handleNext.bind(this)
        this.handlePrevious = this.handlePrevious.bind(this)
        this.handleBlogDelete = this.handleBlogDelete.bind(this)
    }
    handleTextChange = (value) => {
        this.setState({
            blogData: value,
        })
    }
    handleTitleChange = (event) => {
        this.setState({
            blogTitle: event.target.value
        })
    }
    handleNext() {
        this.setState({
            index: this.state.index - 1
        })
        axios.get('/getblogpost')
            .then((res) => {
                this.setState({
                    blogData: res.data[this.state.index].body,
                    blogTitle: res.data[this.state.index].title,
                    blogDate: res.data[this.state.index].post_date,
                    length: res.data.length,
                    blogId: res.data[this.state.index].id,
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
        axios.get('/getblogpost')
            .then((res) => {
                this.setState({
                    blogData: res.data[this.state.index].body,
                    blogTitle: res.data[this.state.index].title,
                    blogDate: res.data[this.state.index].post_date,
                    length: res.data.length,
                    blogId: res.data[this.state.index].id,
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
    handleBlogUpdate = (event) => {
        console.log(this.state.blogId, 'blog id')
        axios.put('/updateblog', {
            body: this.state.blogData,
            title: this.state.blogTitle,
            id: this.state.blogId,
        }).then(function (res) {
            console.log(res)
        }).catch(function (error) {
            console.log(error)
            alert("error! try again")
        })
        this.setState({
            open: true,
        })
    }

    handleBlogDelete = (event) => {
        console.log(this.state.blogId, 'blog id')
        axios.delete('/deleteblog/' + this.state.blogId
        ).then(function (res) {
            console.log(res)
        }).catch(function (error) {
            console.log(error)
            alert("error! try again")
        })
        axios.get('/getblogpost')
            .then((res) => {
                this.setState({
                    blogData: res.data[this.state.index].body,
                    blogTitle: res.data[this.state.index].title,
                    length: res.data.length,
                    blogId: res.data[this.state.index].id,
                })
                console.log(this.state.blogData)
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
        axios.get('/getblogpost')
            .then((res) => {
                this.setState({
                    blogData: res.data[this.state.index].body,
                    blogTitle: res.data[this.state.index].title,
                    length: res.data.length,
                    blogId: res.data[this.state.index].id,
                })
                // console.log(this.state.blogData)
                console.log(this.state.length)
                console.log(this.state.index)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        return (
            <div>
                <div className="quill">
                    <h1>Edit Existing Post</h1>
                    <TextField
                        type='text'
                        className='textfield'
                        primary="true"
                        hintText="Enter Post Title Here"
                        floatingLabelText="Post Title"
                        value={this.state.blogTitle}
                        onChange={this.handleTitleChange} />
                    <ReactQuill value={this.state.blogData}
                        modules={this.state.modules}
                        formats={this.state.formats}
                        placeholder="start typing..."
                        onChange={this.handleTextChange}>
                    </ReactQuill>
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
                    className="updateButton"
                    onClick={this.handleBlogUpdate}
                    label="Update"
                    primary={true}
                    icon={<i className="fa fa-wrench fa-fw" />}
                />
                <RaisedButton
                    className="deleteButton"
                    onClick={this.handleBlogDelete}
                    label="Delete"
                    primary={false}
                    icon={<i className="fa fa-trash fa-fw" />}
                />
                <Snackbar
                    open={this.state.open}
                    message="Blog Updated!"
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
            </div >
        )
    }
}

export default EditBlog