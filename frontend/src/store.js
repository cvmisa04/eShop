import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

import {productsReducers,productDetails,newReview,newProductReducer,deleteProductReducer,getReviews,deleteReviews} from './reducers/productsReducers'
import {authReducer, userReducer,forgotPassword,allUsersReducer,userDetails} from './reducers/userReducer'
import {cartReducer} from './reducers/cartReducers'
import {orderReducer,showOrders,getOrderDetails,allOrdersReducer,updateOrdersReducer} from './reducers/orderReducers'

const reducer = combineReducers({
    products: productsReducers,
    newProduct:newProductReducer,
    deleteProduct:deleteProductReducer,
    ProductDetails:productDetails,
    auth:authReducer,
    user:userReducer,
    userDetail:userDetails,
    forgotPassword:forgotPassword,
    allUser:allUsersReducer,
    cart: cartReducer,
    newOrder:orderReducer,
    allOrders:allOrdersReducer,
    showOrders:showOrders,
    orderDetails:getOrderDetails,
    updateOrders:updateOrdersReducer,
    NewReview:newReview,
    AllReviews:getReviews,
    reviewsReducer:deleteReviews

})


let initialState ={
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shipingInfo:localStorage.getItem('shipingInfo') ? JSON.parse(localStorage.getItem('shipingInfo')) : {}
    }
}

let middlware = [thunk]

const store = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middlware)))


export default store