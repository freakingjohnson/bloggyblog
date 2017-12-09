import React, { Component } from 'react'
import TextEditor from './TextEditor'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import { connect } from 'react-redux'
import { getUser } from '../ducks/reducer'
import '../css/CreateBlog.css'



class CreateBlog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange = (event) => {
        this.setState({
            value: event.target.value,

        })
    }
    componentDidMount() {
        this.props.getUser()
    }

    render() {
        const loginJSX = (
            this.props.user ?
                <div>
                    <div/>
                    <RaisedButton
                        className="logoutButton"
                        label="Logout"
                        href="/auth/logout"
                        icon={<i className="fa fa-lock fa-fw" aria-hidden="true" />}
                    />
                    <div className="main">
                        <Paper className="editor" zDepth={5}>
                            <div className='title'>
                                <TextField
                                    hintText="Enter Post Title Here"
                                    floatingLabelText="Post Title"
                                    value={this.state.value}
                                    onChange={this.handleChange} />
                            </div>
                            <TextEditor />
                        </Paper>
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