import axios from 'axios'
import { FETCH_USER } from './types'

// redux-thunk inspects action creators and if it returns a function instead of an action, it will pass dispatch to it and then let us dispatch the action
export const fetchUser = () => async (dispatch) => {
    const user = await axios.get('/api/current_user')
    dispatch({ type: FETCH_USER, payload: user.data })
}

// -original syntax-
// export const fetchUser = () => {
//     return async function (dispatch) {
//         const user = await axios.get('/api/current_user')
//         dispatch({ type: FETCH_USER, payload: user })
//     }
// }
