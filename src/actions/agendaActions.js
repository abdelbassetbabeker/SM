
import { axiosInstance } from "./config/api";
import {
    ADD_TO_AGENDA_FAIL,
    ADD_TO_AGENDA_REQUEST,
    ADD_TO_AGENDA_SUCCESS,
    TEACHER_AGENDA_FAIL,
    TEACHER_AGENDA_REQUEST,
    TEACHER_AGENDA_SUCCESS
} from "../constants/agendaConstants";



export const teacherAgenda = (teacherID, courseID) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        },
        params: {
            course_id: teacherID,
            teacher_id: courseID
        }
    }
    try {
        dispatch({ type: TEACHER_AGENDA_REQUEST })

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/agendas`, config);

        dispatch(
            {
                type: TEACHER_AGENDA_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: TEACHER_AGENDA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })

    }

}



export const addAgenda = (agendaData) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    try {
        dispatch({ type: ADD_TO_AGENDA_REQUEST })

        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/agendas`, agendaData, config);

        dispatch({
            type: ADD_TO_AGENDA_SUCCESS,
            payload: data
        })

    } catch (error) {

        dispatch({
            type: ADD_TO_AGENDA_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}


// export const deleteClass = (id) => async (dispatch) => {

//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }

//     try {
//         dispatch({ type: DELETE_CLASS_REQUEST })

//         const { data } = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/classrooms/${id}`, config);

//         dispatch(
//             {
//                 type: DELETE_CLASS_SUCCESS,
//                 payload: data
//             })

//     } catch (error) {

//         dispatch({
//             type: DELETE_CLASS_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.response
//         })
//     }

// }


