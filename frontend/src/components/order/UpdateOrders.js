import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import { Fragment,useEffect,useState } from 'react'
import Loader from '../layout/Loader'
import {useDispatch,useSelector} from 'react-redux'
import Metadata from '../layout/Metadata';
import {orderDetailAction,updateOrder,clearError} from '../../actions/orderActions';
import {useAlert} from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import { UPDATE_ORDER_RESET } from '../../constans/orderContstans'
import Sidebar from '../admin/Sidebar'

const UpdateOrders = ({match}) => {

    const [status, setStatus] = useState('')
  

    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()

    const {loading,order={}}=useSelector(state=>state.orderDetails)
    const {shipingInfo,orderItems,paymentInfo,user,totalPrice,orderStatus} = order
    const {error,isUpdated} =useSelector(state=>state.updateOrders)

    const orderId = match.params.id

    useEffect(() => {
       dispatch(orderDetailAction(orderId))


        if (error) {
            alert.error(error)
            dispatch(clearError())
        }
        

        if (isUpdated) {
            history.push('/admin/orders')
            alert.success('Uspesno ste izmenili narudzbinu.')
            dispatch({ type: UPDATE_ORDER_RESET })
           
        }
    }, [alert, dispatch, error, history, isUpdated,orderId])


    const updateOrderHandler = (id) => {
        

        const formData = new FormData();
        formData.set('status', status);
   

        dispatch(updateOrder(id,formData))
    }

    const shipingDetails = shipingInfo && `${shipingInfo.address},${shipingInfo.city},${shipingInfo.postalCode},${shipingInfo.country}`
    const isPaid = paymentInfo && paymentInfo.status === 'succeeded' ? true : false

    return (
        <Fragment>
        <Metadata title={`Procces orders ${order && order._id}`} />
        <div className='row'>
            <div className="col-12 col-md-2">
               <Sidebar />

            </div>
            <div className='col-12 col-md-10'>
                <Fragment>
                   {loading ? <Loader/> :(

<div className="container container-fluid">
	
<div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-7 order-details">

                <h1 className="my-5">Order # {order._id}</h1>

                <h4 className="mb-4">Shipping Info</h4>
                <p><b>Name:</b> {user && user.name}</p>
                <p><b>Phone:</b> {shipingInfo && shipingInfo.PhoneNo}</p>
                <p className="mb-4"><b>Address:</b>{shipingDetails}</p>
                <p><b>Amount:</b> ${totalPrice}</p>

                <hr />

                
                <h4 className="my-4">Payment</h4>
                    <p className={isPaid ? "greenColor" : "redColor"} ><b>{isPaid ? "PLACENO" : "NIJE PLACENO"}</b></p>


                    <h4 className="my-4">Order Status:</h4>
                    <p className={order.orderStatus && String(order.orderStatus).includes('Delivered') ? "greenColor" : "redColor"} ><b>{orderStatus}</b></p>
                
                <h4 className="my-4">Stripe ID</h4>
                <p className="greenColor" ><b>{paymentInfo && paymentInfo.id}</b></p>




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
            
            <div className="col-12 col-lg-3 mt-5">
                            <h4 className="my-4">Status</h4>

                            <div className="form-group">
                                <select
                                    className="form-control"
                                    name='status'
                                    value={status}
                                    onChange={(e)=>setStatus(e.target.value)}
                                >
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                </select>
                            </div>

                            <button className="btn btn-primary btn-block" onClick={()=>updateOrderHandler(order._id)}>
                                Update Status
                        </button>
                        </div>
            
        </div>

</div>
                   )}

                  </Fragment>

            </div>

        </div>

    </Fragment>
    )
}

export default UpdateOrders
