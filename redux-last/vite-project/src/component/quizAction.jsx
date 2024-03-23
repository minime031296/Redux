import axios from 'axios'

export const fetchquizData = () => {
    return async(dispatch) => {
        try {
            let response = await axios.get(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-quiz`)
            dispatch({type: "FETCH_QUIZ_DATA_SUCCESS", payload: response.data})
        } catch (error) {
            dispatch({type: "FETCH_QUIZ_DATA_FAILURE", payload: error.message})
        }
    }
}