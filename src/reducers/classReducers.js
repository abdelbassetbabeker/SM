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
} from "../constants/classConstants"



export const classesListReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_CLASSES_REQUEST:
            return {
                loding: true,
                classes: []
            }
        case LIST_CLASSES_SUCCESS:
            return {
                loding: false,
                classes: action.payload
            }
        case LIST_CLASSES_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const addClassReducer = (state = {}, action) => {
    switch (action.type) {

        case ADD_CLASS_REQUEST:
            return {
                loding: true,
            }
        case ADD_CLASS_SUCCESS:
            return {
                loding: false,
                class: action.payload
            }
        case ADD_CLASS_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}



export const deleteClassReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_CLASS_REQUEST:
            return {
                loding: true,
            }
        case DELETE_CLASS_SUCCESS:
            return {
                loding: false,
                success: action.payload
            }
        case DELETE_CLASS_FAIL:
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

