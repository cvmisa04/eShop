import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
    SHOW_ORDER_REQUEST,
    SHOW_ORDER_SUCCESS,
    SHOW_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    DELETE_ORDER_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    CLEAR_ERROR,
    UPDATE_ORDER_RESET
} from '../constans/orderContstans'



export const orderReducer = (state = {}, action) => {

    switch (action.type) {
        case NEW_ORDER_REQUEST:
            return {
                ...state,
                loading: true,

            }
        case NEW_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case NEW_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const showOrders = (state = { orders: [] }, action) => {
    switch (action.type) {
        case SHOW_ORDER_REQUEST:
            return {
                loading: true
            }
        case SHOW_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case SHOW_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }



        default:
            return state
    }


}

export const getOrderDetails = (state = { order: {} }, action) => {
    switch (action.type) {

        case ORDER_DETAIL_REQUEST:
            return {
                loading: true
            }
        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case ORDER_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }


        default:
            return state

    }
}

export const allOrdersReducer = (state = { orders: [] }, action) => {

    switch(action.type){
    
    case ALL_ORDER_REQUEST:
        return{
           
            loading:true
        }
    case ALL_ORDER_SUCCESS:
        return{
            loading:false,
            orders:action.payload.orders,
            totalAmount: action.payload.totalAmount
        }
    case ALL_ORDER_FAIL:
        return{
            loading:false,
            error:action.payload
        }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }


        default: return state
    }


}

export const updateOrdersReducer = (state={},action)=>{

    switch(action.type){
    
    case UPDATE_ORDER_REQUEST:
    case DELETE_ORDER_REQUEST:
        return{
            ...state,
            loading:true
        }
    case UPDATE_ORDER_SUCCESS:
        return{
            loading:false,
            isUpdated:action.payload
        }
    case DELETE_ORDER_SUCCESS:
            return{
                loading:false,
                isDeleted:action.payload
            }
    case UPDATE_ORDER_FAIL:
    case DELETE_ORDER_FAIL:
        return{
           ...state,
            error:action.payload
        }
    case UPDATE_ORDER_RESET:
        return{
            ...state,
            isUpdated:false
        }
    case DELETE_ORDER_RESET:
            return{
                ...state,
                isDeleted:false
            }
    
    case CLEAR_ERROR:
        return{
            ...state,
            error:null
        }


        default: return state
    }
}