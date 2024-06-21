
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
} from "../constants/plansConstants"



export const plansListReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_PLANS_REQUEST:
            return {
                loding: true,
                plans: []
            }
        case LIST_PLANS_SUCCESS:
            return {
                loding: false,
                plans: action.payload
            }
        case LIST_PLANS_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}

export const addPlanReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_PLAN_REQUEST:
            return {
                loding: true,
            }
        case ADD_PLAN_SUCCESS:
            return {
                loding: false,
                plan: action.payload
            }
        case ADD_PLAN_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}



export const deletePlanReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_PLAN_REQUEST:
            return {
                loding: true,
            }
        case DELETE_PLAN_SUCCESS:
            return {
                loding: false,
                success: action.payload
            }
        case DELETE_PLAN_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}




// export const showTeacherReducer = (state = {}, action) => {
//     switch (action.type) {
//         case SHOW_TEACHER_REQUEST:
//             return {
//                 loding: true,
//             }
//         case SHOW_TEACHER_SUCCESS:
//             return {
//                 loding: false,
//                 teacher: action.payload
//             }
//         case SHOW_TEACHER_FAIL:
//             return {
//                 loding: false,
//                 error: action.payload
//             }
//         default:
//             return state
//     }

// }


// export const editTeacherReducer = (state = {}, action) => {
//     switch (action.type) {
//         case UPDATE_TEACHER_REQUEST:
//             return {
//                 loding: true,
//             }
//         case UPDATE_TEACHER_SUCCESS:
//             return {
//                 loding: false,
//                 teacher: action.payload
//             }
//         case UPDATE_TEACHER_FAIL:
//             return {
//                 loding: false,
//                 error: action.payload
//             }
//         default:
//             return state
//     }

// }

