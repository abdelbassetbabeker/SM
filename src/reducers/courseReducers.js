
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
} from "../constants/courseConstants"



export const coursesListReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_COURSES_REQUEST:
            return {
                loding: true,
                courses: []
            }
        case LIST_COURSES_SUCCESS:
            return {
                loding: false,
                courses: action.payload
            }
        case LIST_COURSES_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const courseGroupsListReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_COURSE_GROUPS_REQUEST:
            return {
                loding: true,
                groups: []
            }
        case LIST_COURSE_GROUPS_SUCCESS:
            return {
                loding: false,
                groups: action.payload
            }
        case LIST_COURSE_GROUPS_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }
}

// }

export const addCourseReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_COURSE_REQUEST:
            return {
                loding: true,
            }
        case ADD_COURSE_SUCCESS:
            return {
                loding: false,
                course: action.payload
            }
        case ADD_COURSE_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}



export const deleteCourseReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COURSE_REQUEST:
            return {
                loding: true,
            }
        case DELETE_COURSE_SUCCESS:
            return {
                loding: false,
                course: action.payload
            }
        case DELETE_COURSE_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}




export const showCourseReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_COURSE_REQUEST:
            return {
                loding: true,
            }
        case SHOW_COURSE_SUCCESS:
            return {
                loding: false,
                course: action.payload
            }
        case SHOW_COURSE_FAIL:
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

