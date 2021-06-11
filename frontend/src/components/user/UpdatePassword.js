import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import Metadata from '../../components/layout/Metadata'

import { useAlert } from 'react-alert';

import {updatePassword,loadUser,clearError} from '../../actions/userActions'
import {useHistory} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {UPDATE_PASSWORD_RESET} from '../../constans/userConstans'


//component
const UpdatePassword = () => {

const alert = useAlert();
const dispatch = useDispatch();
const history = useHistory();

//state
const [oldPassword,setOldPassword]= useState('');
const [password,setPassword]= useState('');

const {loading,error,isUpdated}= useSelector(state=>state.user)

//useEffect

useEffect(()=>{

if(error){
    dispatch(clearError())
    alert.error("Desila se greska");  
}

if(isUpdated){
    alert.success('Uspesno ste promenili password')
    dispatch(loadUser())
    history.push('/me')
    dispatch({type:UPDATE_PASSWORD_RESET})
}

},[dispatch,alert,history,error,isUpdated])


//Handler form

const submitHandler= (e)=>{
    e.preventDefault()

    const formData = new FormData();

    formData.set('oldPassword',oldPassword);
    formData.set('password',password)

    dispatch(updatePassword(formData))
}


    return (
        <Fragment>
            <Metadata title={`Change Password`}/>
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form onSubmit={submitHandler} className="shadow-lg">
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false}>Update Password</button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default UpdatePassword
