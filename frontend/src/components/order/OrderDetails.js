import React from 'react'
import { Link} from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader'
import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../layout/Metadata';
import { orderDetailAction, clearError } from '../../actions/orderActions';
import { useAlert } from 'react-alert'


const OrderDetails = ({ match }) => {
    const alert = useAlert()
    const disptach = useDispatch();
    const { loading, error, order={} } = useSelector(state => state.orderDetails)
    const { shipingInfo, orderItems, paymentInfo, user, totalPrice, orderStatus } = order

    useEffect(() => {
        disptach(orderDetailAction(match.params.id))

        if (error) {
            alert.error(error)
            disptach(clearError())
        }
    }, [alert, disptach, error, match.params.id])

    const shipingDetail = shipingInfo && `${shipingInfo.address},${shipingInfo.city},${shipingInfo.postalCode},${shipingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status ==='succeeded'

    return (
        <Fragment>
            <Metadata title={'Order Details'} />

            {loading ? <Loader /> : (
                <Fragment>
                    <div className="container container-fluid">
	
    <div className="row d-flex justify-content-between">
                <div className="col-12 col-lg-8 mt-5 order-details">

                    <h1 className="my-5">Order # {order._id}</h1>

                    <h4 className="mb-4">Shipping Info</h4>
                    <p><b>Name:</b> {user && user.name}</p>
                    <p><b>Phone:</b> {shipingInfo && shipingInfo.PhoneNo}</p>
                    <p className="mb-4"><b>Address:</b>{shipingDetail}</p>
                    <p><b>Amount:</b> ${totalPrice}</p>

                    <hr />

                    <h4 className="my-4">Payment</h4>
                    <p className={isPaid ? "greenColor" : "redColor"} ><b>{isPaid ? "PLACENO" : "NIJE PLACENO"}</b></p>


                    <h4 className="my-4">Order Status:</h4>
                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>


                    <h4 className="my-4">Order Items:</h4>

                    <hr />
                    <div className="cart-item my-1">

                        {orderItems &&  orderItems.map(item=>(
                                <div key={item.product} className="row my-5">
                                <div className="col-4 col-lg-2">
                                    <img src={item.image} alt={item.name} height="45" width="65" />
                                </div>

                                <div className="col-5 col-lg-5">
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </div>


                                <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                                    <p>${item.price}</p>
                                </div>

                                <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                                    <p>{item.quantity} Piece(s)</p>
                                </div>
                            </div>

                        ))}
                            
                    </div>
                    <hr />
                </div>
            </div>
    
</div>
                </Fragment>
            )}

        </Fragment>
    )
}

export default OrderDetails
