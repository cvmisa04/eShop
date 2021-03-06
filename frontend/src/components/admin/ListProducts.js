import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../layout/Metadata';
import { getAdminProducts, clearError, deleteProduct } from '../../actions/productActions';
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'

import { DELETE_PRODUCT_RESET } from '../../constans/productsConstans'

const ListProducts = ({history}) => {

    const alert = useAlert()
    const disptach = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)
    const {error:deleteError,isDeleted}=useSelector(state=>state.deleteProduct)

    useEffect(() => {
        disptach(getAdminProducts())

        if (error) {
            alert.error(error)
            disptach(clearError())
        }
        if (deleteError) {
            alert.error(deleteError)
            disptach(clearError())
        }

        if(isDeleted){
            alert.success('Uspesno ste obrisali proizvod.')
           history.push('/admin/products')
            disptach({type:DELETE_PRODUCT_RESET})
        }
    }, [alert, disptach, error,isDeleted,history])

    const setProducts = () => {
        const data = {
            columns: [
                {
                    label: "ID",
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: "Name",
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: "Price",
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: "Stock",
                    field: 'stock',
                    sort: 'asc'
                },
                {
                    label: "Actions",
                    field: 'actions'
                }
            ],
            rows: []
        }

        products.forEach(product => {
            data.rows.push({
                id: product._id,
                name: product.name,
                price: `$${product.price}`,
                stock: product.stock,




                actions: <Fragment>
                    <Link to={`/admin/product/${product._id}`} className='btn btn-primary py-1 px-2'>
                        <i className='fa fa-pencil'></i>

                    </Link>

                    <button className='btn btn-danger py-1 px-2 ml-2'>
                        <i className='fa fa-trash' onClick={()=>deleteHandler(product._id)}></i>
                    </button>
                </Fragment>
            })
        })


        return data;
    }

    const deleteHandler =(id)=>{
        disptach(deleteProduct(id))
       
    }

    return (
        <Fragment>
            <Metadata title={"All products"} />
            <div className='row'>
                <div className="col-12 col-md-2">
                    <Sidebar />

                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <h1 className='my-5'>
                            All products
                        </h1>

                        {loading ? <Loader /> : (
                            <Fragment>

                                <MDBDataTable
                                    data={setProducts()}
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

export default ListProducts
