import React, { Component } from 'react'
import TextEditor from './TextEditor'
import ImageUpload from './ImageUpload'
import EditBlog from './EditBlog'
import DeleteImage from './DeleteImage'
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
                        <div className="editor">
                            <TextEditor />
                        </div>
                        <br />
                        <div className="uploader">
                            <ImageUpload />
                        </div>
                        <br />
                        <div className="editor">
                            <EditBlog />
                        </div>
                        <br />
                            <DeleteImage />
                        <br />
                    </div>

                </div>
                :
                <div className='container'>
                    <h1 className='appName'>NOT AUTHORIZED GET OUT!</h1>
                    <a id="admin" className="bm-item-list" href={process.env.REACT_APP_LOGIN}><i className="fa fa-lock fa-fw" aria-hidden="true" /> Admin</a>
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