import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Fragment,useEffect } from 'react'
import {useAlert} from 'react-alert'
import {createOrder, clearError} from '../../actions/orderActions'
import { useSelector,useDispatch } from 'react-redux'
import Metadata from '../layout/Metadata';
import CheckoutSteps from './CheckoutSteps'
import {useStripe, useElements,CardNumberElement,CardExpiryElement,CardCvcElement} from '@stripe/react-stripe-js'

import axios from 'axios'

const options = {
  style: {
      base: {
          fontSize: '16px'
      },
      invalid: {
          color: '#9e2146'
      }
  }
}

const Payment = () => {

    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements()
    const alert = useAlert()
    const dispatch = useDispatch()

    const {user} = useSelector(state=>state.auth)
    const {cartItems,shipingInfo}= useSelector(state=>state.cart)
    const {error} = useSelector(state=>state.newOrder)

    useEffect(() => {

      if(error){
        alert.error(error)
        console.log(error)
        dispatch(clearError())
      }

     

  }, [alert,dispatch,error])



  const order ={
    orderItems:cartItems,
    shipingInfo
  }

  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))

  if(orderInfo){
    order.itemsPrice = orderInfo.itemsPrice
    order.shipingPrice = orderInfo.shipingPrice
    order.taxPrice = orderInfo.taxPrice 
    order.totalPrice = orderInfo.totalPrice
  }

  const paymentData ={
    amount:Math.round(orderInfo.totalPrice * 100)

  }



  const sumbitHandler = async (e) => {
    e.preventDefault();

    document.querySelector('#pay_btn').disabled = true;

    let res;
    try {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        res = await axios.post('/api/v1/payment/process', paymentData, config)

        const clientSecret = res.data.client_secret;

       

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    name: user.name,
                    email: user.email
                }
            }
        });

        if (result.error) {
            alert.error(result.error.message);
            document.querySelector('#pay_btn').disabled = false;
        } else {

            // The payment is processed or not
            if (result.paymentIntent.status === 'succeeded') {

               order.paymentInfo ={
                 id:result.paymentIntent.id,
                 status:result.paymentIntent.status
               }
               dispatch(createOrder(order))
                history.push('/success')
            } else {
                alert.error('There is some issue while payment processing')
                console.log(error)
            }
        }
       

    } catch (error) {
        document.querySelector('#pay_btn').disabled = false;
        alert.error(error.response.data.message)
        console.log(error.response)
       
    }
}

    return (
        <Fragment>
            <Metadata title={'Payment'} />
            <CheckoutSteps shiping confirmOrder payment />
            <div className="row wrapper">
		<div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={sumbitHandler}>
                <h1 className="mb-4">Card Info</h1>
                <div className="form-group">
                  <label htmlFor="card_num_field">Card Number</label>
                  <CardNumberElement
                    type="text"
                    id="card_num_field"
                    className="form-control"
                    options={options}
                    
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_exp_field">Card Expiry</label>
                  <CardExpiryElement
                    type="text"
                    id="card_exp_field"
                    className="form-control"
                    options={options}
                 
                  />
                </div>
				
				<div className="form-group">
                  <label htmlFor="card_cvc_field">Card CVC</label>
                  <CardCvcElement
                    type="text"
                    id="card_cvc_field"
                    className="form-control"
                    options={options}
                   
                  />
                </div>
      
            
                <button
                  id="pay_btn"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  Pay {`- ${orderInfo && orderInfo.totalPrice}`}
                </button>
    
              </form>
			  </div>
        </div>
            
        </Fragment>
    )
}

export default Payment
