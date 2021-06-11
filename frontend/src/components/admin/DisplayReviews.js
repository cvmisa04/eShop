import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../layout/Metadata';
import { allReviews,deleteReviews, clearError } from '../../actions/productActions';
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'

import { DELETE_REVIEW_RESET } from '../../constans/productsConstans'
const DisplayReviews = () => {
    const alert = useAlert()
    const disptach = useDispatch();

    const [productId, setProductId] = useState('')
    const { loading, error, reviews} = useSelector(state => state.AllReviews)
    const {isDeleted}= useSelector(state=>state.reviewsReducer)




    useEffect(() => {



        if (error) {
             alert.error(error)
            disptach(clearError())
           
          
           
        }

        if (productId !== '') {
            disptach(allReviews(productId))
        }


        if(isDeleted){
        alert.success('Uspesno ste obrisali review.')
        
            disptach({type:DELETE_REVIEW_RESET})
        }
    }, [alert, disptach, error, productId,isDeleted])

    const deleteReviewHandler=(id)=>{
        disptach(deleteReviews(id,productId))
    }

    const sumbitHandlerReviews = (e) => {
        e.preventDefault()

        disptach(allReviews(productId))
    }

    const setReview = () => {
        const data = {
            columns: [
                {
                    label: "ReviewID",
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: "Rating",
                    field: 'rating',
                    sort: 'asc'
                },
                {
                    label: "Comment",
                    field: 'comment',
                    sort: 'asc'
                },
                {
                    label: "User",
                    field: 'user',
                    sort: 'asc'
                },
                {
                    label: "Actions",
                    field: 'actions'
                }
            ],
            rows: []
        }

        reviews.forEach(review => {
            data.rows.push({
                id: review._id,
                rating: review.rating,
                comment: review.comment,
                user: review.name,







                actions:
                <Fragment>

              
                    <button className='btn btn-danger py-1 px-2 ml-2' onClick={()=>deleteReviewHandler(review._id)} >
                        <i className='fa fa-trash' ></i>
                    </button>
                    </Fragment>

            })
        })


        return data;
    }
    return (
        <Fragment>
            <Metadata title={"All Reviews"} />
            <div className='row'>
                <div className="col-12 col-md-2">
                    <Sidebar />

                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                        <div className="container container-fluid">
                            <div className="row justify-content-center mt-5">
                                <div className="col-5">
                                    <form onSubmit={sumbitHandlerReviews}>
                                        <div className="form-group">
                                            <label htmlFor="productId_field">Enter Product ID</label>
                                            <input
                                                type="text"
                                                id="email_field"
                                                className="form-control"
                                                value={productId}
                                                onChange={(e) => setProductId(e.target.value)}
                                            />
                                        </div>

                                        <button
                                            id="search_button"
                                            type="submit"
                                            className="btn btn-primary btn-block py-2"
                                        >
                                            SEARCH
								</button>
                                    </ form>
                                </div>

                            </div>
                        </div>
                        {reviews && reviews.length > 0 ? (

                            <Fragment>

                                <MDBDataTable
                                    data={setReview()}
                                    classNameName='px-3'
                                    bordered
                                    striped
                                    hover


                                />
                            </Fragment>

                        ) : (
                            <p className='mt-5 text-center'>No Reviews.</p>
                        )}



                    </Fragment>

                </div>

            </div>

        </Fragment>
    )
}

export default DisplayReviews
