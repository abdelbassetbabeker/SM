
import { axiosInstance } from "./config/api";
import {
    ADD_CLASS_FAIL,
    ADD_CLASS_REQUEST,
    ADD_CLASS_SUCCESS,

    DELETE_CLASS_FAIL,
    DELETE_CLASS_REQUEST,
    DELETE_CLASS_SUCCESS,

    LIST_CLASSES_FAIL,
    LIST_CLASSES_REQUEST,
    LIST_CLASSES_SUCCESS
} from "../constants/classConstants";




export const listClasses = () => async (dispatch) => {

    try {
        dispatch({ type: LIST_CLASSES_REQUEST })

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/classrooms`);

        dispatch(
            {
                type: LIST_CLASSES_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: LIST_CLASSES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}



export const addClass = (classData) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    try {
        dispatch({ type: ADD_CLASS_REQUEST })

        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/classrooms`, classData, config);

        dispatch(
            {
                type: ADD_CLASS_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: ADD_CLASS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}


export const deleteClass = (id) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        dispatch({ type: DELETE_CLASS_REQUEST })

        const { data } = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/classrooms/${id}`, config);

        dispatch(
            {
                type: DELETE_CLASS_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: DELETE_CLASS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}


