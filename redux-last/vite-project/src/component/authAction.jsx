import axios from 'axios'

export const login = (credentials) => {
    return async(dispatch) => {
        try {
            const response = await axios.get('https://reqres.in/api/login', credentials)
            dispatch({type: "LOGIN_SUCCESS", payload: response.data})
        } catch (error) {
            dispatch({type: "LOGIN_FAIL", payload: error.message})
        }
    }

}