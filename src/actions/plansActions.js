import {
    ADD_PLAN_FAIL,
    ADD_PLAN_REQUEST,
    ADD_PLAN_SUCCESS,

    DELETE_PLAN_FAIL,
    DELETE_PLAN_REQUEST,
    DELETE_PLAN_SUCCESS,

    LIST_PLANS_FAIL,
    LIST_PLANS_REQUEST,
    LIST_PLANS_SUCCESS
} from "../constants/plansConstants";

import { axiosInstance } from "./config/api";




export const listPlans = () => async (dispatch) => {

    try {
        dispatch({ type: LIST_PLANS_REQUEST })

        const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/plans`);

        dispatch(
            {
                type: LIST_PLANS_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: LIST_PLANS_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}



export const addPlan = (planData) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    try {
        dispatch({ type: ADD_PLAN_REQUEST })

        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/plans`, planData, config);

        dispatch(
            {
                type: ADD_PLAN_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: ADD_PLAN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}


export const deletePlan = (id) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    try {
        dispatch({ type: DELETE_PLAN_REQUEST })

        const { data } = await axiosInstance.delete(`${process.env.REACT_APP_API_URL}/plans/${id}`, config);

        dispatch(
            {
                type: DELETE_PLAN_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: DELETE_PLAN_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}




// export const showTeacher = (id) => async (dispatch) => {

//     const config = {
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }

//     try {
//         dispatch({ type: SHOW_TEACHER_REQUEST })

//         const { data } = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/teachers/${id}`, config);

//         dispatch(
//             {
//                 type: SHOW_TEACHER_SUCCESS,
//                 payload: data
//             })

//     } catch (error) {

//         dispatch({
//             type: SHOW_TEACHER_FAIL,
//             payload: error.response && error.response.data.message ? error.response.data.message : error.response
//         })
//     }

// }



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
