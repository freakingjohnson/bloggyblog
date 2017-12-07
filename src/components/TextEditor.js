import React, { Component } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// let createReactClass = require('create-react-class')

class TextEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            title: '',
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

        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(value) {
        this.setState({
            text: value
        })
    }
    render() {
        return (
            <div>
                <form>
                    Post Title:
                    <input type='text'
                        name="title"
                        value={this.state.title} />
                </form>

                <ReactQuill value={this.state.text}
                    modules={this.state.modules}
                    formats={this.state.formats}
                    placeholder="start typing..."
                    onChange={this.handleChange}>
                </ReactQuill>
            </div >
        )
   }       
}

export default TextEditor