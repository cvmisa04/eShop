import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../layout/Metadata';
import { getAllOrders,deleteOrder, clearError} from '../../actions/orderActions';
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'

import { DELETE_ORDER_RESET } from '../../constans/orderContstans'

const OrdersList = ({history}) => {

    const alert = useAlert()
    const disptach = useDispatch();
    const { loading, error, orders } = useSelector(state => state.allOrders)
    const {isDeleted,error:deleteError}= useSelector(state=>state.updateOrders)
 

    useEffect(() => {
        disptach(getAllOrders())

        if (error) {
            alert.error(error)
            disptach(clearError())
        }
        if (deleteError) {
            alert.error(deleteError)
            disptach(clearError())
        }
        
        if(isDeleted){
            alert.success('Uspesno ste obrisali narudzbinu.')
           history.push('/admin/orders')
            disptach({type:DELETE_ORDER_RESET})
        }
    }, [alert, disptach, error,isDeleted,history,deleteError])

    const deleteOrderHandler=(id)=>{
        disptach(deleteOrder(id))
    }

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: "Order ID",
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: "Num Of Items",
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: "Amount",
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: "Status",
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: "Actions",
                    field: 'actions'
                }
            ],
            rows: []
        }

        orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered') ? <p style={{color: 'green'}}>{order.orderStatus}</p>
                : <p style={{color: 'red'}}>{order.orderStatus}</p>,




                actions: <Fragment>
                    <Link to={`/admin/order/${order._id}`} className='btn btn-primary py-1 px-2'>
                        <i className='fa fa-eye'></i>

                    </Link>

                    <button className='btn btn-danger py-1 px-2 ml-2' onClick={()=>deleteOrderHandler(order._id)}>
                        <i className='fa fa-trash' ></i>
                    </button>
                </Fragment>
            })
        })


        return data;
    }
    return (
        <Fragment>
            <Metadata title={"All Orders"} />
            <div className='row'>
                <div className="col-12 col-md-2">
                    <Sidebar />

                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <h1 className='my-5'>
                            All ORDERS
                        </h1>

                        {loading ? <Loader /> : (
                            <Fragment>

                                <MDBDataTable
                                    data={setOrders()}
                                    className='px-3'
                                    bordered
                                    striped
                                    hover


                                />
                            </Fragment>
                        )}
                    </Fragment>

                </div>

            </div>

        </Fragment>
    )
}

export default OrdersList
