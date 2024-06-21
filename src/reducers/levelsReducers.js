import {
    ADD_LEVEL_FAIL,
    ADD_LEVEL_REQUEST,
    ADD_LEVEL_SUCCESS,
    DELETE_LEVEL_FAIL,
    DELETE_LEVEL_REQUEST,
    DELETE_LEVEL_SUCCESS,
    LIST_LEVELS_FAIL,
    LIST_LEVELS_REQUEST,
    LIST_LEVELS_SUCCESS
} from "../constants/levelsConstants"



export const levelsListReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_LEVELS_REQUEST:
            return {
                loding: true,
                levels: []
            }
        case LIST_LEVELS_SUCCESS:
            return {
                loding: false,
                levels: action.payload
            }
        case LIST_LEVELS_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}

export const addLevelReducer = (state = {}, action) => {
    switch (action.type) {

        case ADD_LEVEL_REQUEST:
            return {
                loding: true,
            }
        case ADD_LEVEL_SUCCESS:
            return {
                loding: false,
                level: action.payload
            }
        case ADD_LEVEL_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}



export const deleteLevelReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_LEVEL_REQUEST:
            return {
                loding: true,
            }
        case DELETE_LEVEL_SUCCESS:
            return {
                loding: false,
                success: action.payload
            }
        case DELETE_LEVEL_FAIL:
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

