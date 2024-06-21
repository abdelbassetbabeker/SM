import {
    ADD_EXPENSE_FAIL,
    ADD_EXPENSE_REQUEST,
    ADD_EXPENSE_SUCCESS,

    LIST_EXPENSES_FAIL,
    LIST_EXPENSES_REQUEST,
    LIST_EXPENSES_SUCCESS
} from "../constants/expensesConstants"


export const expensesListReducer = (state = {}, action) => {
    switch (action.type) {
        case LIST_EXPENSES_REQUEST:
            return {
                loding: true,
                expenses: []
            }
        case LIST_EXPENSES_SUCCESS:
            return {
                loding: false,
                expenses: action.payload
            }
        case LIST_EXPENSES_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}

export const addExpenseReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_EXPENSE_REQUEST:
            return {
                loding: true,
            }
        case ADD_EXPENSE_SUCCESS:
            return {
                loding: false,
                expense: action.payload
            }
        case ADD_EXPENSE_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}



// export const deleteTeacherReducer = (state = {}, action) => {
//     switch (action.type) {
//         case DELETE_TEACHER_REQUEST:
//             return {
//                 loding: true,
//             }
//         case DELETE_TEACHER_SUCCESS:
//             return {
//                 loding: false,
//                 success: action.payload
//             }
//         case DELETE_TEACHER_FAIL:
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

