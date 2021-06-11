import axios from 'axios'


import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    CLEAR_ERROR,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    DETAILS_USERS_REQUEST,
    DETAILS_USERS_SUCCESS,
    DETAILS_USERS_FAIL,
    UPDATE_USERS_REQUEST,
    UPDATE_USERS_SUCCESS,
    UPDATE_USERS_FAIL,
    DELETE_USERS_REQUEST,
    DELETE_USERS_SUCCESS,
    DELETE_USERS_FAIL
} from '../constans/userConstans'


//Login

export const login = (email, password) => async (dispatch) => {

    try {
        dispatch({ type: LOGIN_REQUEST })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/login', { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.message
        })
    }
}

// Register user
export const register = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Load user

export const loadUser = ()=> async(dispatch)=>{

    try {
        dispatch({type:LOAD_USER_REQUEST})

        

        const {data}= await axios.get('/api/v1/me')

        dispatch({type:LOAD_USER_SUCCESS,
                payload:data.user
            })
        
    } catch (error) {

        dispatch({type:LOAD_USER_FAIL,
                    payload:error.response.data.message})
        
    }
}

//Logout user

export const logoutUser = ()=>async(dispatch)=>{

    try {

        await axios.get('/api/v1/logout')

        dispatch({type:LOGOUT_SUCCESS})

       
        
    } catch (error) {
        dispatch({type:LOGOUT_FAIL,
                payload:error.response.data.message
        })
    }
}

//Update user

export const updateUser =(userData)=>async(dispatch)=>{

    try {
        dispatch({type:UPDATE_USER_REQUEST})
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

    const link = '/api/v1/me/update'
    const {data} = await axios.put(link,userData,config)

    dispatch(
        {type:UPDATE_USER_SUCCESS,
            payload:data.success
        })

        
    } catch (error) {
        dispatch({type:UPDATE_USER_FAIL,
                    payload:error.response.data.message})
    }
}

//Update password 

export const updatePassword =(passwords)=>async(dispatch)=>{

    try {
        dispatch({type:UPDATE_PASSWORD_REQUEST})
      const config ={
          headers:{
              "Content-Type":"application/json"
          }}  
          const link = '/api/v1/password/update'

          const {data} = await axios.put(link,passwords,config)
          
          dispatch({type:UPDATE_PASSWORD_SUCCESS,
                    payload:data.success})
    
    } catch (error) {
        dispatch({type:UPDATE_USER_FAIL,
                    payload:error.response.data.message})
    }
}

//forgot password

export const forgotPasswordA = (email)=>async(dispatch)=>{

    try {

        dispatch({type:FORGOT_PASSWORD_REQUEST})
        const config={
            headers:{
                'Content-Type':'application/json'
            }
        }

        const link = '/api/v1/password/forgot'

        const {data} = await axios.post(link,email,config)
        dispatch({type:FORGOT_PASSWORD_SUCCESS,
                    payload:data.message
        })
        
    } catch (error) {
        dispatch({type:FORGOT_PASSWORD_FAIL,
                    payload:error.response.data.message
        })
        
    }
}

//all users (ADMIN)

export const allUser = ()=>async(dispatch)=>{
    try {

        dispatch({type:ALL_USERS_REQUEST})

        const {data}= await axios.get(`/api/v1/admin/users`)

        dispatch({type:ALL_USERS_SUCCESS,
            payload:data.users
        })
        
    } catch (error) {

        dispatch({type:ALL_USERS_FAIL,
            payload:error.response.data.message
        })
        
    }
}

//update user (ADMIN)
export const updateUsers=(id,userData)=>async(dispatch)=>{

    try {

        dispatch({type:UPDATE_USERS_REQUEST})

        const config={
            headers:{
                "Content-Type":"application/json"
            }
       
        }
        const {data}= await axios.put(`/api/v1/admin/user/${id}`,userData,config)

        dispatch({type:UPDATE_USERS_SUCCESS,
            payload:data.user
        })
    } catch (error) {
        dispatch({type:UPDATE_USERS_FAIL,
        payload:error.response.data.message
        })
        
    }
}

export const deleteUsers =(id)=>async(dispatch)=>{
    try {
        dispatch({type:DELETE_USERS_REQUEST})

        const {data}= await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({type:DELETE_USERS_SUCCESS,
            payload:data.user
        })
        
    } catch (error) {
        dispatch({type:DELETE_USERS_FAIL,
            payload:error.response.data.message
        })
        
    }
}

//userDetails

export const getUserDetails=(id)=>async(dispatch)=>{

    try {
        dispatch({type:DETAILS_USERS_REQUEST})

        const {data}= await axios.get(`/api/v1/admin/user/${id}`)

        dispatch({type:DETAILS_USERS_SUCCESS,
            payload:data.user
        })
        
    } catch (error) {
        dispatch({type:DETAILS_USERS_FAIL,
            payload:error.response.data.message
        })
        
    }
}
//Reset password

export const resetPassword =(token,passwords)=> async(dispatch)=>{
    try {
        dispatch({type:NEW_PASSWORD_REQUEST})
        
        const config ={
            headers:{
                "Content-Type":"application/json"
            }}
            const link = `/api/v1/password/reset/${token}`

            const {data}= await axios.put(link,passwords,config)
            dispatch({type:NEW_PASSWORD_SUCCESS,
                    payload:data.success})
        
    } catch (error) {
        dispatch({type:
            NEW_PASSWORD_FAIL,
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