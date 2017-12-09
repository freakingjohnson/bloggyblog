import React, { Component } from "react"
import AppBar from 'material-ui/AppBar'
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from './theme'
import "../css/Sidebar.css"


export default class Sidebar extends Component {
    constructor() {
        super()

        this.state = {
            open: false,
        }
        this.handleOpen = this.handleOpen.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }


    handleOpen() {
        this.setState({
            open: !this.state.open
        })
    }

    handleClose() {
        this.setState({
            open: false
        })
    }

    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                    <AppBar
                        title="bloggyblogblog"
                        iconElementLeft={<IconButton onClick={this.handleOpen}><MenuIcon /></IconButton>} // Shows the delete icon next to the title
                        showMenuIconButton={true} // Shows the hamburger menu on the left of the title
                        // iconElementRight={}
                    />
                    <Drawer
                        open={this.state.open} // remove to make the drawer always present
                        // openSecondary={true} // opens on the right side of the screen
                        // width={300} // sets custom width
                        docked={false} // allows for overlay (can click away, or press escape to close menu)
                        onRequestChange={(open) => this.setState({ open })} // doesn't do much on it's own. Pair with docked
                    >
                        <MenuItem onClick={this.handleClose}> <a id="home" className="bm-item-list" href="/#/"><i className="fa fa-home fa-fw" aria-hidden="true" /> Home</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="blog" className="bm-item-list" href="/#/blog"><i className="fa fa-book fa-fw" aria-hidden="true" /> Blog</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="gallery" className="bm-item-list" href="/#/gallery"><i className="fa fa-picture-o fa-fw" aria-hidden="true" /> Gallery</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="about" className="bm-item-list" href="/#/about"><i className="fa fa-info-circle fa-fw" aria-hidden="true" /> About</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="contact" className="bm-item-list" href="/#/contact"><i className="fa fa-envelope fa-fw" aria-hidden="true" /> Contact</a> </MenuItem>
                        <MenuItem onClick={this.handleClose}> <a id="admin" className="bm-item-list" href="http://localhost:3005/login"><i className="fa fa-lock fa-fw" aria-hidden="true" /> Admin</a> </MenuItem>
                    </Drawer>
                </MuiThemeProvider>
            </div>
        )
    }
}