
import {
    CREATE_ENROLMENT_FAIL,
    CREATE_ENROLMENT_REQUEST,
    CREATE_ENROLMENT_SUCCESS,
    DELETE_ENROLMENT_FAIL,
    DELETE_ENROLMENT_REQUEST,
    DELETE_ENROLMENT_SUCCESS,
    SHOW_ENROLMENT_FAIL,
    SHOW_ENROLMENT_REQUEST,
    SHOW_ENROLMENT_SUCCESS
} from '../constants/enrolmentConstants'

export const enrolmentReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ENROLMENT_REQUEST:
            return {
                loding: true,
            }
        case CREATE_ENROLMENT_SUCCESS:
            return {
                loding: false,
                enrolment: action.payload
            }
        case CREATE_ENROLMENT_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const showEnrolmentReducer = (state = {}, action) => {
    switch (action.type) {
        case SHOW_ENROLMENT_REQUEST:
            return {
                loding: true,
            }
        case SHOW_ENROLMENT_SUCCESS:
            return {
                loding: false,
                enrolment: action.payload
            }
        case SHOW_ENROLMENT_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }
}


export const deleteEnrolmentReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ENROLMENT_REQUEST:
            return {
                loding: true,
            }
        case DELETE_ENROLMENT_SUCCESS:
            return {
                loding: false,
                enrolment: action.payload
            }
        case DELETE_ENROLMENT_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }
}
