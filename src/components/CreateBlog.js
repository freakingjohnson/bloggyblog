import React, { Component } from 'react'
import Sidebar from './Sidebar'
import TextEditor from './TextEditor'
import { connect } from 'react-redux'
import {getUser} from '../ducks/reducer'


import '../css/CreateBlog.css'
class CreateBlog extends Component {

    componentDidMount() {
        this.props.getUser()
    }

    render() {
        const loginJSX = (
            this.props.user ?
                <div className="background">
                    <Sidebar />
                    <header className="header">Write New Post</header>
                    <a className="logoutButton" href="/auth/logout"><i className="fa fa-lock fa-fw" aria-hidden="true">
                    </i>Logout</a>
                    <div className="editor">
                        <TextEditor />
                    </div>
                </div>
                :
                <div>
                    <h1>not authorized</h1>
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