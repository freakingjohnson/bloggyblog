import React, { Component } from 'react'
import TextEditor from './TextEditor'
import ImageUpload from './ImageUpload'
import EditBlog from './EditBlog'
import DeleteImage from './DeleteImage'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { getUser } from '../ducks/reducer'
import '../css/CreateBlog.css'

class CreateBlog extends Component {

    componentWillMount() {
        this.props.getUser()
    }

    render() {
        console.log(this.props)
        const loginJSX = (
            this.props.user.displayName ?
                <div>
                    <RaisedButton
                        className="logoutButton"
                        label="Logout"
                        secondary={true}
                        href="/auth/logout"
                        icon={<i className="fa fa-lock fa-fw blackLock" color="black"/>}
                    />

                    <div className="container">
                        <h1 className="appName">Admin</h1>
                        <Paper className="editor" zDepth={5}>
                            <h1>Create New Post</h1>
                            <TextEditor />
                        </Paper>
                        <br />
                        <Paper className="uploader" zDepth={5}>
                            <h1>Upload Image to Gallery</h1>
                            <ImageUpload />
                        </Paper>
                        <br />
                        <Paper className="editor" zDepth={5}>
                            <h1>Edit Existing Post</h1>
                            <EditBlog />
                        </Paper>
                        <br />
                        <DeleteImage />
                        <br />
                    </div>

                </div>
                :
                <div className='container'>
                    <h1 className='appName'>NOT AUTHORIZED GET OUT!</h1>
                </div>
        )
        return (
            <div>
                {loginJSX}
            </div>
        );

    }

}

function mapStateToProps(state) {
    return {
        user: state.userData
    }
}
export default connect(mapStateToProps, { getUser })(CreateBlog)