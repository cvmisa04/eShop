import React from 'react'
import {  Link } from 'react-router-dom'
import { Fragment} from 'react'

import Metadata from '../layout/Metadata';




const OrderSuccess = () => {
    return (
        <Fragment>
            <Metadata title={'Success Order'} />
            <div className="container container-fluid">
        <div className="row justify-content-center">
            <div className="col-6 mt-5 text-center">
                <img className="my-5 img-fluid d-block mx-auto" src="/images/success.png" alt="Order Success" width="200" height="200" />

                <h2>Vasa narudzbina je uspesno poslata!</h2>

                <Link to="/orders/me">Go to Orders</Link>
            </div>

        </div>
    </div>
            
        </Fragment>
    )
}

export default OrderSuccess
