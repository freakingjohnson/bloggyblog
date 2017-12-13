import React, { Component } from 'react'
import { Card, CardTitle, CardText } from 'material-ui/Card';
import axios from 'axios'


class Blog extends Component {
    constructor() {
        super()
        this.state = {
            blogData: undefined
        }

    }

    componentDidMount() {
        axios.get('/getblogpost')
            .then((res) => {
                this.setState({
                    blogData: res.data
                })
                console.log(this.state.blogData)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    render() {

        const data = this.state.blogData
        console.log(data)
        let blogs = data && data.map(group => {
            return (
                <div>
                    <Card>
                        <CardTitle title={group.title} subtitle={group.post_date} />
                        <CardText>
                            {data ? <div dangerouslySetInnerHTML={{ __html: group.body }} /> : undefined}
                        </CardText>
                    </Card>
                    <br />
                </div>
            )
        })

        return (
            <div className='container'>
                <h1 className='appName'>Blog</h1>
                {blogs}
            </div>

        );
    }
}

export default Blog