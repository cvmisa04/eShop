import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import { Fragment } from 'react'

import { useSelector } from 'react-redux'
import Metadata from '../layout/Metadata';
import CheckoutSteps from './CheckoutSteps'

const ConfirmOrders = () => {

    const history = useHistory()

    const { cartItems, shipingInfo } = useSelector(state => state.cart)

    const { user } = useSelector(state => state.auth)

    //calculate

    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const shipingPrice = itemsPrice > 200 ? 0 : 25
    const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    const totalPrice = (itemsPrice + shipingPrice + taxPrice).toFixed(2)

    const proccesToPayment = () => {
        const data = {
            itemsPrice: itemsPrice.toFixed(2),
            shipingPrice,
            taxPrice,
            totalPrice
        }

        sessionStorage.setItem('orderInfo', JSON.stringify(data))
        history.push('/payment')
    }


    return (
        <Fragment>
            <div className="container container-fluid">
                <Metadata title={'Confirm Order'} />
                <CheckoutSteps shiping confirmOrder />

                <div className="row d-flex justify-content-between">
                    <div className="col-12 col-lg-8 mt-5 order-confirm">

                        <h4 className="mb-3">Shipping Info</h4>
                        <p><b>Name:</b>{user && user.name}</p>
                        <p><b>Phone:</b> {shipingInfo.PhoneNo}</p>
                        <p className="mb-4"><b>Address:</b>{`${shipingInfo.address}, ${shipingInfo.city}, ${shipingInfo.postalCode}, ${shipingInfo.country}`}</p>

                        <hr />
                        <h4 className="mt-4">Your Cart Items:</h4>
                        {cartItems.map(item => (

                            <Fragment>
                                <hr />
                                <div className="cart-item my-1" key={item.product}>
                                    <div className="row">
                                        <div className="col-4 col-lg-2">
                                            <img src={item.image} alt="Laptop" height="45" width="65" />
                                        </div>

                                        <div className="col-5 col-lg-6">
                                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                                        </div>


                                        <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                                            <p>{item.quantity} x ${item.price} = <b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                        </div>

                                    </div>
                                </div>
                                <hr />
                            </Fragment>

                        ))}


                    </div>

                    <div className="col-12 col-lg-3 my-4">
                        <div id="order_summary">
                            <h4>Order Summary</h4>
                            <hr />
                            <p>Subtotal:  <span className="order-summary-values">${itemsPrice}</span></p>
                            <p>Shipping: <span className="order-summary-values">${shipingPrice}</span></p>
                            <p>Tax:  <span className="order-summary-values">${taxPrice}</span></p>

                            <hr />

                            <p>Total: <span className="order-summary-values">${totalPrice}</span></p>

                            <hr />
                            <button id="checkout_btn" className="btn btn-primary btn-block" onClick={proccesToPayment}>Proceed to Payment</button>
                        </div>
                    </div>


                </div>
            </div>

        </Fragment>
    )
}

export default ConfirmOrders
