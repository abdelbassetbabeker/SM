import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT
} from "../constants/loginConstants"
import { axiosInstance } from "./config/api"


export const login = (user, password) => async (dispatch) => {
    try {
        dispatch({ type: USER_LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/login`, { user, password }, config)
        dispatch(
            {
                type: USER_LOGIN_SUCCESS,
                payload: data
            })
        localStorage.setItem('userInfo', JSON.stringify(data))


    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}


export const logout = () => async (dispatch) => {

    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT })
}