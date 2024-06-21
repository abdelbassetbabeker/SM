import {
    ADD_TO_AGENDA_FAIL,
    ADD_TO_AGENDA_REQUEST,
    ADD_TO_AGENDA_SUCCESS,

    TEACHER_AGENDA_FAIL,
    TEACHER_AGENDA_REQUEST,
    TEACHER_AGENDA_SUCCESS
} from "../constants/agendaConstants"


export const teacherAgendaReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHER_AGENDA_REQUEST:
            return {
                loding: true,
                agenda: []
            }
        case TEACHER_AGENDA_SUCCESS:
            return {
                loding: false,
                agenda: action.payload
            }
        case TEACHER_AGENDA_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const addAgendaReducer = (state = {}, action) => {
    switch (action.type) {

        case ADD_TO_AGENDA_REQUEST:
            return {
                loding: true,
            }
        case ADD_TO_AGENDA_SUCCESS:
            return {
                loding: false,
                agenda: action.payload
            }
        case ADD_TO_AGENDA_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}



// export const deleteClassReducer = (state = {}, action) => {
//     switch (action.type) {
//         case DELETE_CLASS_REQUEST:
//             return {
//                 loding: true,
//             }
//         case DELETE_CLASS_SUCCESS:
//             return {
//                 loding: false,
//                 success: action.payload
//             }
//         case DELETE_CLASS_FAIL:
//             return {
//                 loding: false,
//                 error: action.payload
//             }
//         default:
//             return state
//     }

// }




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

