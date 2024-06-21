import {
    ADD_TEACHER_FAIL,
    ADD_TEACHER_REQUEST,
    ADD_TEACHER_SUCCESS,
    DELETE_TEACHER_FAIL,
    DELETE_TEACHER_REQUEST,
    DELETE_TEACHER_SUCCESS,
    SHOW_TEACHER_FAIL,
    SHOW_TEACHER_REQUEST,
    SHOW_TEACHER_SUCCESS,
    TEACHERS_LIST_FAIL,
    TEACHERS_LIST_REQUEST,
    TEACHERS_LIST_SUCCESS,
    UPDATE_TEACHER_FAIL,
    UPDATE_TEACHER_REQUEST,
    UPDATE_TEACHER_SUCCESS,
} from "../constants/teacherConstants"



export const teacherListReducer = (state = {}, action) => {
    switch (action.type) {
        case TEACHERS_LIST_REQUEST:
            return {
                loding: true,
                teachers: []
            }
        case TEACHERS_LIST_SUCCESS:
            return {
                loding: false,
                teachers: action.payload
            }
        case TEACHERS_LIST_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}

export const addTeacherReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_TEACHER_REQUEST:
            return {
                loding: true,
            }
        case ADD_TEACHER_SUCCESS:
            return {
                loding: false,
                teacher: action.payload
            }
        case ADD_TEACHER_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}



export const deleteTeacherReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TEACHER_REQUEST:
            return {
                loding: true,
            }
        case DELETE_TEACHER_SUCCESS:
            return {
                loding: false,
                success: action.payload
            }
        case DELETE_TEACHER_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}




export const showTeacherReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_TEACHER_REQUEST:
            return {
                loding: true,
            }
        case SHOW_TEACHER_SUCCESS:
            return {
                loding: false,
                teacher: action.payload
            }
        case SHOW_TEACHER_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}


export const editTeacherReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TEACHER_REQUEST:
            return {
                loding: true,
            }
        case UPDATE_TEACHER_SUCCESS:
            return {
                loding: false,
                teacher: action.payload
            }
        case UPDATE_TEACHER_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}

