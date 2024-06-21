import { ADD_STUDENT_FAIL, ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, DELETE_STUDENT_FAIL, DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, LIST_STUDENTS_FAIL, LIST_STUDENTS_REQUEST, LIST_STUDENTS_SUCCESS, SHOW_STUDENT_FAIL, SHOW_STUDENT_REQUEST, SHOW_STUDENT_SUCCESS } from "../constants/StudentConstants";
import { axiosInstance } from "./config/api";



export const listStudents = (page = 0, perPage = 5) => async (dispatch) => {

    try {
        dispatch({ type: LIST_STUDENTS_REQUEST })

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/students`,
            {
                params: {
                    page,
                    perPage
                }
            }
        );


        dispatch(
            {
                type: LIST_STUDENTS_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: LIST_STUDENTS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}



export const addStudent = (studentData) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }
    try {
        dispatch({ type: ADD_STUDENT_REQUEST })

        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/students`, studentData, config);

        dispatch(
            {
                type: ADD_STUDENT_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: ADD_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}


export const deleteStudent = (id) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }
    try {
        dispatch({ type: DELETE_STUDENT_REQUEST })

        const { data } = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/students/${id}`, config);

        dispatch(
            {
                type: DELETE_STUDENT_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: DELETE_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}





export const showStudent = (id) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        dispatch({ type: SHOW_STUDENT_REQUEST })

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/students/${id}`, config);

        dispatch(
            {
                type: SHOW_STUDENT_SUCCESS,
                payload: data.data
            })

    } catch (error) {

        dispatch({
            type: SHOW_STUDENT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}