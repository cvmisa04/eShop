import axios from 'axios'
import {
    NEW_ORDER_REQUEST,
    NEW_ORDER_SUCCESS,
    NEW_ORDER_FAIL,
    CLEAR_ERROR,
    SHOW_ORDER_REQUEST,
    SHOW_ORDER_SUCCESS,
    SHOW_ORDER_FAIL,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    
} from '../constans/orderContstans'


export const createOrder = (order)=>async(dispatch,getState)=>{

    try {
        dispatch({type:NEW_ORDER_REQUEST})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data} = await axios.post('/api/v1/order/new',order,config)

    dispatch({
        type:NEW_ORDER_SUCCESS,
        payload:data
    })
        
    } catch (error) {
        dispatch({type:NEW_ORDER_FAIL,
            payload:error.response.data.ErrMessage
        })
        
    }
}


export const myOrders = ()=>async(dispatch)=>{
    try {
        dispatch({type:SHOW_ORDER_REQUEST})

        const {data} = await axios.get('/api/v1/orders/me')

        dispatch({type:SHOW_ORDER_SUCCESS,
                payload:data.orders
        })
        
    } catch (error) {
        dispatch({type:SHOW_ORDER_FAIL,
        payload:error.response.data.ErrMessage})
    }
}

export const orderDetailAction = (id)=>async(dispatch)=>{

    try {
        dispatch({type:ORDER_DETAIL_REQUEST})

        const {data}= await axios.get(`/api/v1/order/${id}`)

        dispatch({type:ORDER_DETAIL_SUCCESS,
            payload:data.order
        })
        
    } catch (error) {

        dispatch({type:ORDER_DETAIL_FAIL,
        payload:error.response.data.ErrMessage
        })
        
    }

}

//All orders (ADMIN)

export const getAllOrders =()=>async(dispatch)=>{

    try {

        dispatch({type:ALL_ORDER_REQUEST})

        const {data}= await axios.get('/api/v1/admin/orders')

        dispatch({
            type:ALL_ORDER_SUCCESS,
            payload:data
        })
        
    } catch (error) {

        dispatch({
            type:ALL_ORDER_FAIL,
            payload:error.response.data.ErrMessage
        })
        
    }
}

//Update order admin
export const updateOrder=(id,orderData)=>async(dispatch)=>{
    try {
        dispatch({type:UPDATE_ORDER_REQUEST})

        const config ={
            headers:{
                "Content-Type":"application/json"
            }
        }

        const {data}= await axios.put(`/api/v1/admin/order/${id}`,orderData,config)

        dispatch({type:UPDATE_ORDER_SUCCESS,
            payload:data.success
        })
        
    } catch (error) {

        dispatch({type:UPDATE_ORDER_FAIL,
        payload:error.response.data.message
        })
        
    }
}

export const deleteOrder = (id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_ORDER_REQUEST})

        const {data} = await axios.delete(`/api/v1/admin/order/${id}`)

    dispatch({type:DELETE_ORDER_SUCCESS,
        payload:data.success
    })
        
    } catch (error) {

        dispatch({type:DELETE_ORDER_FAIL,
            payload:error.response.data.message
        })
        
    }
}

//CLEAR ERROR

export const clearError = () => async(dispatch)=>{

    dispatch({
        type:CLEAR_ERROR
    })
}