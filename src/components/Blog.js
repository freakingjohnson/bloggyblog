import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton'
import axios from 'axios'
import '../css/App.css'
import '../css/Blog.css'

const createDOMPurify = require('dompurify');
const DOMPurify = createDOMPurify(window);


class Blog extends Component {
    constructor() {
        super()
        this.state = {
            blogData: undefined,
            blogTitle: undefined,
            blogDate: undefined,
            index: 0,
            nextButton: true,
            previousButton: false,
            length: undefined
        }
        this.handleNext = this.handleNext.bind(this)
        this.handlePrevious = this.handlePrevious.bind(this)
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
    componentDidMount() {
        axios.get('/getblogpost')
            .then((res) => {
                this.setState({
                    blogData: res.data[this.state.index].body,
                    blogTitle: res.data[this.state.index].title,
                    blogDate: res.data[this.state.index].post_date,
                    length: res.data.length
                })
                console.log(this.state.blogData)
                console.log(this.state.length)
                console.log(this.state.index)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {
        const body = this.state.blogData
        const title = this.state.blogTitle
        const date = this.state.blogDate

        const clean = DOMPurify.sanitize(body)
        // console.log(data)
        return (
            <div className='container'>
                <h1 className='appName'>Blog</h1>
                <Card >
                    <CardTitle title={title} subtitle={date} />
                    <CardText>
                        {<div dangerouslySetInnerHTML={{ __html: clean }} />}
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
                <br />
            </div>
        )
    }
}
//     render() {
//         const data = this.state.blogData
//         console.log(data)
//         let blogs = data && data.map(group => {
//             console.log(group)
//             return (
//                 <div>
//                     <Card >
//                         <CardTitle title={group.title} subtitle={group.post_date} />
//                         <CardText>
//                             {data ? <div dangerouslySetInnerHTML={{ __html: group.body }} /> : undefined}
//                         </CardText>
//                     </Card>
//                     <br />
//                 </div>
//             )
//         })

//         return (
//             <div className='container'>
//                 <h1 className='appName'>Blog</h1>
//                 {blogs}
//             </div>

//         );
//     }
// }

export default Blog