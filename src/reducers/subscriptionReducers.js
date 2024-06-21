import { SUBSCRIPTION_FAIL, SUBSCRIPTION_REQUEST, SUBSCRIPTION_SUCCESS } from "../constants/subscriptionConstants"


export const addSubscriptionReducer = (state = {}, action) => {
    switch (action.type) {

        case SUBSCRIPTION_REQUEST:
            return {
                loding: true,
            }
        case SUBSCRIPTION_SUCCESS:
            return {
                loding: false,
                subscription: action.payload
            }
        case SUBSCRIPTION_FAIL:
            return {
                loding: false,
                error: action.payload
            }
        default:
            return state
    }

}

