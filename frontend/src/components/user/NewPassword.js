import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import Metadata from '../../components/layout/Metadata'

import { useAlert } from 'react-alert';

import {resetPassword,clearError} from '../../actions/userActions'
import {useHistory} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'

const NewPassword = ({match}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const history = useHistory();
//state
const [password,setPassword]= useState('');
const [confirmPassword,setConfirmPassword]=useState('')

//useSelector
const {error,success}= useSelector(state=>state.forgotPassword)
useEffect(()=>{

    if(error){
        alert.error(error)
        dispatch(clearError())
    }
   
     if(success){
         alert.success('Uspesno ste resetovali lozinku')
         history.push('/login')
     }

     

},[dispatch,history,error,success,alert])

const sumbitHandler =(e)=>{
    e.preventDefault()
    const formData = new FormData();

    formData.set('password',password);
    formData.set('confirmPassword',confirmPassword)

    dispatch(resetPassword(match.params.token,formData))
   
}
    return (
        <Fragment>
            <Metadata title={'New Password'} />
            <div class="row wrapper">
            <div class="col-10 col-lg-5">
                <form onSubmit={sumbitHandler} class="shadow-lg">
                    <h1 class="mb-3">New Password</h1>

                    <div class="form-group">
                        <label for="password_field">Password</label>
                        <input
                            type="password"
                            id="password_field"
                            class="form-control"
                            value={password}
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                    </div>

                    <div class="form-group">
                        <label for="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            class="form-control"
                            value={confirmPassword}
                            onChange={(e)=>setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        class="btn btn-block py-3">
                        Set Password
                    </button>

                </form>
            </div>
        </div>
        </Fragment>
    )
}

export default NewPassword
