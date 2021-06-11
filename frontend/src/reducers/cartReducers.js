import {ADD_TO_CART, REMOVE_ITEM_TO_CART, SAVE_SHIPING_INFO} from '../constans/cartConstans'



export const cartReducer = (state={  cartItems:[],  shipingInfo:{} },action)=>{

    switch(action.type){

    case ADD_TO_CART:
            const item = action.payload;
          
            const isItemExist = state.cartItems.find(i => i.product === item.product)

            if(isItemExist){
                return{
                    ...state,
                    cartItems: state.cartItems.map(i=> i.product === item.product ? item : i)
                }

            }else{
                return{
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        case REMOVE_ITEM_TO_CART:
            return{
                ...state,
                cartItems: state.cartItems.filter(i=>i.product !== action.payload)
            }
        case SAVE_SHIPING_INFO:
            return{
                ...state,
                shipingInfo:action.payload
            }
     


        default:
            return state
    }
}