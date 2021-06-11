import React, {useEffect,useState} from 'react'
import {Switch} from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import {useSelector} from 'react-redux'
import Header from './components/layout/header'
import Footer from './components/layout/footer'
import Home from './components/Home'
import ProductDetails from './components/product/ProductDetails'
import Login from './components/user/Login'
import Register from './components/user/Register'
import {loadUser} from './actions/userActions'
import store from './store'
import Profile from './components/user/Profile'
import ProtectedRoute from './components/route/ProtectedRoute'
import UpdateProfile from './components/user/UpdateProfile'
import UpdatePassword from './components/user/UpdatePassword'
import ForgotPassword from './components/user/ForgotPassword'
import NewPassword from './components/user/NewPassword'
import Cart from './components/cart/Cart'
import Shiping from './components/cart/Shiping'
import ConfirmOrders from './components/cart/ConfirmOrders'
import axios from 'axios'
import Payment from './components/cart/Payment'

//Payment

import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import OrderSuccess from './components/cart/OrderSuccess'
import ListOfOrders from './components/order/ListOfOrders'
import OrderDetails from './components/order/OrderDetails'
import Dashboard from './components/admin/Dashboard'
import ListProducts from './components/admin/ListProducts'
import NewProduct from './components/admin/NewProduct'
import { userReducer } from './reducers/userReducer'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrdersList'
import UpdateOrders from './components/order/UpdateOrders'
import UsersList from './components/admin/UsersList'
import UpdateUser from './components/admin/UpdateUser'
import DisplayReviews from './components/admin/DisplayReviews'








function App() {

    const [stripeApiKey,setStripeApyKey]=useState('')

    const {loading,user} = useSelector(state=>state.auth)
 useEffect(()=>{
    store.dispatch(loadUser()) 

    async function getStipeApyKey (){
        const {data} = await axios.get('/api/v1/stripeapi')
        setStripeApyKey(data.stripeApiKey)
    }

    getStipeApyKey()
    console.log(stripeApiKey)
   
 },[])

    return (
        <>
            <Router>
                <Header />
                <Route exact path='/' component={Home}/>
                <Route  path='/search/:keyword' component={Home}/>
                <Route exact path='/product/:id' component={ProductDetails}/>


                <Route path='/cart' component={Cart} exact />
                <ProtectedRoute path='/shiping' exact component={Shiping}/>
                <ProtectedRoute path='/order/confirm' exact component={ConfirmOrders}/>
                <ProtectedRoute path='/success' exact component={OrderSuccess}/>

                {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path="/payment" component={Payment} />
            </Elements>
          }
                <Route path='/login' component={Login} exact />
                <Route path='/register' component={Register} />
                <Route path='/password/forgot' component={ForgotPassword} exact />
                <Route path='/password/reset/:token' component={NewPassword} exact/>
          
                <ProtectedRoute path='/me' exact component={Profile}/>
                <ProtectedRoute path='/me/update' exact component={UpdateProfile}/>
                <ProtectedRoute path='/password/update'  component={UpdatePassword}/>

                <ProtectedRoute path='/orders/me'  component={ListOfOrders} exact/>
                <ProtectedRoute path='/order/:id'  component={OrderDetails} exact/>
    

            <ProtectedRoute path='/dashboard' isAdmin={true}  component={Dashboard} exact/>
            <ProtectedRoute path='/admin/products' isAdmin={true}  component={ListProducts} exact/>
            <Switch>
                <ProtectedRoute path='/admin/product/new' isAdmin={true}  component={NewProduct} exact/>
                <ProtectedRoute path='/admin/product/:id' isAdmin={true}  component={UpdateProduct} exact/>
            </Switch>
         
            <ProtectedRoute path='/admin/orders' isAdmin={true}  component={OrdersList} exact/>
            <ProtectedRoute path='/admin/order/:id' isAdmin={true}  component={UpdateOrders} exact/>
            <ProtectedRoute path='/admin/users/' isAdmin={true}  component={UsersList} exact/>
            <ProtectedRoute path='/admin/user/:id' isAdmin={true}  component={UpdateUser} exact/>
            <ProtectedRoute path='/admin/reviews' isAdmin={true}  component={DisplayReviews} exact/>

         
                    <Footer />
              

               
            </Router>


        </>

    )


}

export default App