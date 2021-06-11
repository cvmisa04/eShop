import React from 'react'
import {Link,useHistory} from 'react-router-dom'
import { Fragment,useEffect } from 'react'
import Loader from '../layout/Loader'
import {useDispatch,useSelector} from 'react-redux'
import Metadata from '../layout/Metadata';
import {myOrders,clearError} from '../../actions/orderActions';
import {useAlert} from 'react-alert'
import { MDBDataTable } from 'mdbreact'


const ListOfOrders = () => {

const alert = useAlert()
const disptach = useDispatch();
const {loading,error,orders} = useSelector(state=>state.showOrders)

useEffect(() => {
   disptach(myOrders())

   if(error){
       alert.error(error)
       disptach(clearError())
   }
}, [alert,disptach,error])

const setOrders =()=>{
    const data ={
        columns:[
            {
                label:"Order ID",
                field:'id',
                sort:'asc'
            },
            {
                label:"Num of Items",
                field:'numOfItems',
                sort:'asc'
            },
            {
                label:"Amount",
                field:'amount',
                sort:'asc'
            },
            {
                label:"Status",
                field:'status',
                sort:'asc'
            },
            {
                label:"Actions",
                field:'actions',
                sort:'asc'
            }
        ],
        rows:[]
    }

    orders.forEach(order=>{
        data.rows.push({
            id:order._id,
            numOfItems:order.orderItems.length,
            amount:`$${order.totalPrice}`,
            status: order.orderStatus && String(order.orderStatus).includes('Delivered') ? <p style={{color: 'green'}}>{order.orderStatus}</p>
                                                                                        : <p style={{color: 'red'}}>{order.orderStatus}</p>,

        actions: <Link to={`/order/${order._id}`} className='btn btn-primary'>
            <i className='fa fa-eye'></i>
        </Link>
        })
    })


    return data;
}

    return (
        <Fragment>

            <Metadata title={'My Orders'} />

            <div className='container-fluid'>

           

            <h1 className='my-5'>My Orders</h1>

            {loading ? <Loader/> : (
                <MDBDataTable 
                 data={setOrders()}
                 className='px-3'
                 bordered
                 striped
                 hover


                />

            )}
             </div>
        </Fragment>
    )
}

export default ListOfOrders
