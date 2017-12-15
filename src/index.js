import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { HashRouter } from 'react-router-dom';
import router from './Router'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider } from 'react-redux'
import store from './store'
import Sidebar from './components/Sidebar'
import theme from './components/theme'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'




ReactDOM.render(
    <Provider store={store}>
        <div>
            <Sidebar />
            <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
                <HashRouter>
                    {router}
                </HashRouter>
            </MuiThemeProvider>
        </div>
    </Provider>
    , document.getElementById('root'));

