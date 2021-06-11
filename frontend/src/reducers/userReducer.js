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
UPDATE_USER_REQUEST,
UPDATE_USER_SUCCESS,
UPDATE_USER_RESET,
UPDATE_USER_FAIL,
LOGOUT_SUCCESS,
LOGOUT_FAIL,
CLEAR_ERROR,
UPDATE_PASSWORD_REQUEST,
UPDATE_PASSWORD_SUCCESS,
UPDATE_PASSWORD_FAIL,
UPDATE_PASSWORD_RESET,
FORGOT_PASSWORD_REQUEST,
FORGOT_PASSWORD_SUCCESS,
FORGOT_PASSWORD_FAIL,
NEW_PASSWORD_REQUEST,
NEW_PASSWORD_SUCCESS,
NEW_PASSWORD_FAIL,
ALL_USERS_REQUEST,
ALL_USERS_SUCCESS,
ALL_USERS_FAIL,
UPDATE_USERS_FAIL,
UPDATE_USERS_SUCCESS,
UPDATE_USERS_REQUEST,
UPDATE_USERS_RESET,
DETAILS_USERS_REQUEST,
DETAILS_USERS_SUCCESS,
DETAILS_USERS_FAIL,
DELETE_USERS_REQUEST,
DELETE_USERS_SUCCESS,
DELETE_USERS_RESET,
DELETE_USERS_FAIL
} from '../constans/userConstans'

export const authReducer =(state={user:{}},action)=>{

switch(action.type){
    case LOGIN_REQUEST:
    case REGISTER_USER_REQUEST:
    case LOAD_USER_REQUEST:
        return{
            loading:true,
            isAuthUser:false,

        }
    case LOGIN_SUCCESS:
    case REGISTER_USER_SUCCESS:
    case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthUser:true,
            user:action.payload
        }
        case LOGOUT_SUCCESS:
        return{
            
            loading: false,
            isAuthUser: false,
            user: null
        }
  
    

        case LOAD_USER_FAIL:
            return{
                
                loading:false,
                isAuthUser:false,
                user:null,
                error:action.payload
    
            }

            case LOGOUT_FAIL:
                return{
                    ...state,
                    error:action.payload
                }

 
   
    case LOGIN_FAIL:
    case REGISTER_USER_FAIL:
        return{
            ...state,
            loading:false,
            isAuthUser:false,
            user:null,
            error:action.payload
        }
    case CLEAR_ERROR:
        return{
            ...state,
            error:null
        }

    default:
        return state
}

}

export const userReducer = (state={},action)=>{

    switch(action.type){
    case UPDATE_USER_REQUEST:
    case UPDATE_PASSWORD_REQUEST:
    case UPDATE_USERS_REQUEST:
    case DELETE_USERS_REQUEST:
        return{
            ...state,
            loading:true,

        }
    case UPDATE_USER_SUCCESS:
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_USERS_SUCCESS:
        return{
            ...state,
            loading:false,
            isUpdated:action.payload
        }
    case DELETE_USERS_SUCCESS:
        return{
            ...state,
            loading:false,
            isDeleted:action.payload
        }
    case UPDATE_USER_RESET:
    case UPDATE_PASSWORD_RESET:
    case UPDATE_USERS_RESET:
        return{
            ...state,
            isUpdated:false
        }
    case DELETE_USERS_RESET:
        return{
            ...state,
            isDeleted:false
        }
    case UPDATE_USER_FAIL:
    case UPDATE_PASSWORD_FAIL:
    case UPDATE_USERS_FAIL:
    case DELETE_USERS_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payload
        }
        default:
            return state
    }
}

export const userDetails=(state={user:{}},action)=>{
    switch(action.type){
    case DETAILS_USERS_REQUEST:
        return{
            ...state,
            loading:true
        }
    case DETAILS_USERS_SUCCESS:
        return{
            ...state,
            loading:false,
            user:action.payload
        }
    case DETAILS_USERS_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payload
        }
        default: return state
    }
}

export const forgotPassword= (state={},action)=>{
    switch(action.type){

    case FORGOT_PASSWORD_REQUEST:
    case NEW_PASSWORD_REQUEST:
        return{
            ...state,
            loading:true,
            error:null
        }
    case FORGOT_PASSWORD_SUCCESS:
        return{
            ...state,
            loading:false,
            message:action.payload
        }
    case NEW_PASSWORD_SUCCESS:
        return{
            ...state,
            success:action.payload
        }
    case FORGOT_PASSWORD_FAIL:
    case NEW_PASSWORD_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payload
        }

        default:
            return state
    }
}

export const allUsersReducer = (state={users:[]},action)=>{
    switch(action.type){
    case ALL_USERS_REQUEST:
        return{
            ...state,
            loading:true
        }
    case ALL_USERS_SUCCESS:
        return{
            ...state,
            loading:false,
            users:action.payload
        }
    case ALL_USERS_FAIL:
        return{
            ...state,
            loading:false,
            error:action.payload
        }
    

        default: return state
    }

}