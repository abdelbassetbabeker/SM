import {
    SUBSCRIPTION_FAIL,
    SUBSCRIPTION_REQUEST,
    SUBSCRIPTION_SUCCESS
} from "../constants/subscriptionConstants";
import { axiosInstance } from "./config/api";




export const addSubscription = (SubsData) => async (dispatch) => {

    const config = {
        headers: {
            'Content-type': 'application/json',
        }
    }

    try {
        dispatch({ type: SUBSCRIPTION_REQUEST })

        const { data } = await axiosInstance.post(`${process.env.REACT_APP_API_URL}/subscriptions`, SubsData, config);

        dispatch(
            {
                type: SUBSCRIPTION_SUCCESS,
                payload: data
            })

    } catch (error) {

        dispatch({
            type: SUBSCRIPTION_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.response
        })
    }

}
