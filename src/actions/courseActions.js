

import {
    ADD_COURSE_FAIL,
    ADD_COURSE_REQUEST,
    ADD_COURSE_SUCCESS,
    DELETE_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    LIST_COURSES_FAIL,
    LIST_COURSES_REQUEST,
    LIST_COURSES_SUCCESS,
    LIST_COURSE_GROUPS_FAIL,
    LIST_COURSE_GROUPS_REQUEST,
    LIST_COURSE_GROUPS_SUCCESS,
    SHOW_COURSE_FAIL,
    SHOW_COURSE_REQUEST,
    SHOW_COURSE_SUCCESS
} from "../constants/courseConstants";

import { axiosInstance } from "./config/api";




export const listCourses = () => async (dispatch) => {
    try {
        dispatch({
            type: LIST_COURSES_REQUEST
        })

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/courses`);

        dispatch(
            {
                type: LIST_COURSES_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: LIST_COURSES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}


export const listCourseGroups = (id, teacher_id) => async (dispatch) => {
    try {
        dispatch({
            type: LIST_COURSE_GROUPS_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            },

        }

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/courses/${id}/groups`, { teacher_id }, config);

        dispatch(
            {
                type: LIST_COURSE_GROUPS_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: LIST_COURSE_GROUPS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}



export const addCourse = (courseData) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    console.log(courseData);

    try {
        dispatch({ type: ADD_COURSE_REQUEST })

        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/courses`, courseData, config);

        dispatch(
            {
                type: ADD_COURSE_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: ADD_COURSE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}



export const deleteCourse = (id) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        dispatch({ type: DELETE_COURSE_REQUEST })

        const { data } = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/courses/${id}`, config);

        dispatch(
            {
                type: DELETE_COURSE_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: DELETE_COURSE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}




export const showCourse = (id) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        dispatch({ type: SHOW_COURSE_REQUEST })

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/courses/${id}`, config);

        dispatch(
            {
                type: SHOW_COURSE_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: SHOW_COURSE_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}



// export const editTeacher = (id, teacherData) => async (dispatch) => {

//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         params: {
//             lname: teacherData.lname,
//             fname: teacherData.fname,
//             sex: teacherData.sex,
//             phone: teacherData.phone,
//             email: teacherData.email,
//             salary: teacherData.salary,
//         }

//     }

//     try {
//         dispatch({ type: UPDATE_TEACHER_REQUEST })

//         const { data } = await axiosInstance.put(`${process.env.REACT_APP_API_URL}/teachers/${id}`, null, config);

//         dispatch(
//             {
//                 type: UPDATE_TEACHER_SUCCESS,
//                 payload: data
//             })

//     } catch (error) {

//         dispatch({
//             type: UPDATE_TEACHER_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.response
//         })
//     }

// }





// // export const detailsProduct = (productId) => async (dispatch) => {

// //     try {
// //         dispatch({ type: PRODUCT_DETAILS_REQUEST })

// //         const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/dashboard/product/${productId}`)
// //         dispatch(
// //             {
// //                 type: PRODUCT_DETAILS_SUCCESS,
// //                 payload: data
// //             })

// //     } catch (error) {

// //         dispatch({
// //             type: PRODUCT_DETAILS_FAIL,
// //             payload: error.response && error.response.data.message ? error.response.data.message : error.response
// //         })
// //     }

// // }




// // export const createProduct = (productData) => async (dispatch) => {

// //     try {
// //         dispatch({
// //             type: CREATE_PRODUCT_REQUEST
// //         })

// //         const config = {
// //             headers: {
// //                 'Content-type': 'multipart/form-data',
// //             }
// //         }
// //         // const { data } = await axios.post('http://127.0.0.1:8000/api/products/create', productData, config)
// //         const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/products/create`, productData, config)


// //         dispatch(
// //             {
// //                 type: CREATE_PRODUCT_SUCCESS,
// //                 payload: data
// //             })

// //     } catch (error) {

// //         dispatch({
// //             type: CREATE_PRODUCT_FAIL,
// //             payload: error.response && error.response.data.message ? error.response.data.message : error.response
// //         })
// //     }

// // }


// // export const updateProduct = (productData) => async (dispatch) => {

// //     try {
// //         dispatch({
// //             type: UPDATE_PRODUCT_REQUEST
// //         })

// //         const config = {
// //             headers: {
// //                 'Content-type': 'application/json',
// //             }
// //         }
// //         const { data } = await axios.put(`${process.env.REACT_APP_API_URL}/products/update`, productData, config)


// //         dispatch(
// //             {
// //                 type: UPDATE_PRODUCT_SUCCESS,
// //                 payload: data
// //             })

// //     } catch (error) {

// //         dispatch({
// //             type: UPDATE_PRODUCT_FAIL,
// //             payload: error.response && error.response.data.message ? error.response.data.message : error.response
// //         })
// //     }

// // }




// // export const deleteProduct = (id) => async (dispatch) => {

// //     try {
// //         dispatch({
// //             type: DELETE_PRODUCT_REQUEST
// //         })


// //         // await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`)
// //         const { data } = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`)


// //         dispatch(
// //             {
// //                 type: DELETE_PRODUCT_SUCCESS,
// //             })

// //     } catch (error) {

// //         dispatch({
// //             type: DELETE_PRODUCT_FAIL,
// //             payload: error.response && error.response.data.message ? error.response.data.message : error.response
// //         })
// //     }

// // }
