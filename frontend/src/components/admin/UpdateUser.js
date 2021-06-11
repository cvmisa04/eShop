import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import Metadata from '../../components/layout/Metadata'

import { useAlert } from 'react-alert';

import {updateUsers,loadUser,getUserDetails} from '../../actions/userActions'
import {useHistory} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import {UPDATE_USERS_RESET} from '../../constans/userConstans'
import Sidebar from './Sidebar';

const UpdateUser = ({match}) => {

    const alert = useAlert()
    const history = useHistory()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.userDetail)
    const {error,isUpdated}= useSelector(state=>state.user)

    const [name,setName]=useState('')
    const [email,setEmail]=useState('');
    const [role,setRole]=useState('')
    

 const userId = match.params.id

    useEffect(()=>{

        if(user && user._id !== userId ){
            dispatch(getUserDetails(userId));
        }else{

           setName(user.name)
           setEmail(user.email)
           setRole(user.role)
           
        }

        if(error){
            alert.error(error)
        }

       

        if (isUpdated) {
            alert.success('User updated successfully')
          

            history.push('/admin/users')

            dispatch({
                type: UPDATE_USERS_RESET
            })
        }

        
    },[dispatch,error,history,user,userId,alert,isUpdated])

    const submitHandler=(e)=>{

        e.preventDefault()

        const formData = new FormData()

        formData.set('name',name)
        formData.set('email',email)
        formData.set('role',role)

        dispatch(updateUsers(user._id,formData))

    }
    return (
        <Fragment>
        <Metadata title={"Update User"} />
       
        <div className='row'>
            <div className="col-12 col-md-2">
                <Sidebar />

            </div>
            <div className='col-12 col-md-10'>
                <Fragment>
                <div className="container-container-fluid">
       <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update User</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input 
								type="name" 
								id="name_field" 
								className="form-control"
                                name='name'
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                                    <label htmlFor="role_field">Role</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e)=>setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
                    </form>
                </div>
            </div>
        
    </div>  


                </Fragment>

            </div>

        </div>
        

    </Fragment>
    )
}

export default UpdateUser
