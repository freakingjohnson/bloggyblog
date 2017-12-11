import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import { HashRouter } from 'react-router-dom';
import router from './Router'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { indigo500, indigo700, redA200 } from 'material-ui/styles/colors';
import { Provider } from 'react-redux'
import store from './store'
import Background from './components/Background'
import Sidebar from './components/Sidebar'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: indigo500,
        primary2Color: indigo700,
        accent1Color: redA200,
        pickerHeaderColor: indigo500,
    },
});


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={muiTheme}>
        <Sidebar/>
        <Background/>
            <HashRouter>
                {router}
            </HashRouter>
         </MuiThemeProvider>
   </Provider>
    , document.getElementById('root'));

