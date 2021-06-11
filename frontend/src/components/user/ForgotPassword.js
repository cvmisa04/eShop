import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import Metadata from '../../components/layout/Metadata'

import { useAlert } from 'react-alert';

import {forgotPasswordA,loadUser,clearError} from '../../actions/userActions'
import {useHistory} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'


const ForgotPassword = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();
//state
const [email,setEmail]= useState('');

//useSelector
const {loading,error,message}= useSelector(state=>state.forgotPassword)

//useEffect
useEffect(()=>{

    if(error){
        alert.error("Desila se greska")
        dispatch(clearError())
    }

    if(message){
        alert.success(`Link za resetovanje lozinke je poslat na ${email}`)
        history.push('/')
        
    }

},[dispatch,error,message,alert])

const sumbitHandler=(e)=>{
    e.preventDefault();

    const formData = new FormData()

    formData.set('email',email)

    dispatch(forgotPasswordA(formData))

}

    return (
        <Fragment>
            <Metadata title={'Forgot Password'} />
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" onSubmit={sumbitHandler}>
                        <h1 class="mb-3">Forgot Password</h1>
                        <div class="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input
                                type="email"
                                id="email_field"
                                class="form-control"
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <button
                            id="forgot_password_button"
                            type="submit"
                            class="btn btn-block py-3">
                            Send Email
                    </button>

                    </form>
                </div>
            </div>
            
        </Fragment>
    )
}

export default ForgotPassword
