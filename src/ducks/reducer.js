import axios from 'axios'
require('dotenv').config()


const initialState = {
    userData: {},

}

const GET_USER = 'GET_USER'

export function getUser() {
    const userInfo = axios.get('/auth/me')
        .then(res => {
            console.log('authorized', res.data)
            return res.data
        })
        .catch(res => {
            console.log('not authorized', res.response)
            return res
        })
    return {
        type: GET_USER,
        payload: userInfo
    }
}



export default (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case GET_USER + '_FULFILLED':
            // console.log('_FULFILLED')
            return Object.assign({}, state, { userData: payload.getUser === false ? null : payload })

        default:
            return state;
    }
}

