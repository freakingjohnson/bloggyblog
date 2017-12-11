import React, { Component } from 'react'
import TextEditor from './TextEditor'
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
                    <div />
                    <RaisedButton
                        className="logoutButton"
                        label="Logout"
                        href="http://localhost:3005/auth/logout"
                        icon={<i className="fa fa-lock fa-fw" aria-hidden="true" />}
                    />
                    <div className="main">
                        <Paper className="editor" zDepth={5}>
                            
                            <TextEditor />
                        </Paper>
                    </div>
                </div>
                :
                <div>
                    <h1>NOT AUTHORIZED</h1>
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