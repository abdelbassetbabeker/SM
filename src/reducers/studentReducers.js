import { ADD_STUDENT_FAIL, ADD_STUDENT_REQUEST, ADD_STUDENT_SUCCESS, DELETE_STUDENT_FAIL, DELETE_STUDENT_REQUEST, DELETE_STUDENT_SUCCESS, LIST_STUDENTS_FAIL, LIST_STUDENTS_REQUEST, LIST_STUDENTS_SUCCESS, SHOW_STUDENT_FAIL, SHOW_STUDENT_REQUEST, SHOW_STUDENT_SUCCESS } from "../constants/StudentConstants"



export const studentsListReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_STUDENTS_REQUEST:
            return {
                loding: true,
                students: []
            }
        case LIST_STUDENTS_SUCCESS:
            return {
                loding: false,
                students: action.payload
            }
        case LIST_STUDENTS_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const addStudentReducer = (state = {}, action) => {
    switch (action.type) {

        case ADD_STUDENT_REQUEST:
            return {
                loding: true,
            }
        case ADD_STUDENT_SUCCESS:
            return {
                loding: false,
                student: action.payload
            }
        case ADD_STUDENT_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}



export const deleteStudentReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_STUDENT_REQUEST:
            return {
                loding: true,
            }
        case DELETE_STUDENT_SUCCESS:
            return {
                loding: false,
                student: action.payload
            }
        case DELETE_STUDENT_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}




export const showStudentReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_STUDENT_REQUEST:
            return {
                loding: true,
            }
        case SHOW_STUDENT_SUCCESS:
            return {
                loding: false,
                student: action.payload
            }
        case SHOW_STUDENT_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}


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

