
import { axiosInstance } from "./config/api";
import {
    CREATE_ENROLMENT_FAIL,
    CREATE_ENROLMENT_REQUEST,
    CREATE_ENROLMENT_SUCCESS,
    DELETE_ENROLMENT_FAIL,
    DELETE_ENROLMENT_REQUEST,
    DELETE_ENROLMENT_SUCCESS,
    SHOW_ENROLMENT_FAIL,
    SHOW_ENROLMENT_REQUEST,
    SHOW_ENROLMENT_SUCCESS
} from "../constants/enrolmentConstants";



export const enroll = (enrolmentData) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    try {
        dispatch({ type: CREATE_ENROLMENT_REQUEST })

        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/enrolments`, enrolmentData, config);

        dispatch(
            {
                type: CREATE_ENROLMENT_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: CREATE_ENROLMENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }
}



export const showEnrolment = (id) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    try {
        dispatch({ type: SHOW_ENROLMENT_REQUEST })

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/enrolments/${id}`, config);

        dispatch(
            {
                type: SHOW_ENROLMENT_SUCCESS,
                payload: data.data
            })

    } catch (error) {

        dispatch({
            type: SHOW_ENROLMENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}



export const deleteEnrolment = (id) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    try {
        dispatch({ type: DELETE_ENROLMENT_REQUEST })

        const { data } = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/enrolments/${id}`, config);

        dispatch(
            {
                type: DELETE_ENROLMENT_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: DELETE_ENROLMENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}