import React, { Component } from 'react'
import ReactDisqusComments from 'react-disqus-comments';
import Paper from 'material-ui/Paper'

class Contact extends Component {
    handleNewComment(comment) {
        console.log(comment.text);
    }
    render() {
        return (
            <div className="container">
                <h1 className="appName">Discussion</h1>
                
                <Paper zdepth={5}>
                    <ReactDisqusComments
                        shortname="bloggyblogblog-1"
                        identifier=""
                        title=""
                        url="http://bloggyblogblog-1.disqus.com"
                        category_id=""
                        onNewComment={this.handleNewComment} 
                        />
                </Paper>
            </div>

        );
    }
}

export default Contact