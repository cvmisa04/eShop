import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../layout/Metadata';
import { allUser,deleteUsers,clearError} from '../../actions/userActions';
import { useAlert } from 'react-alert'
import { MDBDataTable } from 'mdbreact'
import Sidebar from './Sidebar'

import { DELETE_USERS_RESET } from '../../constans/userConstans'

const UsersList = ({history}) => {


    const alert = useAlert()
    const disptach = useDispatch();
    const { loading, error, users } = useSelector(state => state.allUser)
    const {isDeleted}= useSelector(state=>state.user)
 
 

    useEffect(() => {
        disptach(allUser())
        

        if (error) {
            alert.error(error)
            disptach(clearError())
        }
        
        
        if(isDeleted){
        alert.success('Uspesno ste obrisali korisnika.')
           history.push('/admin/users')
            disptach({type:DELETE_USERS_RESET})
        }
    }, [alert, disptach, error,isDeleted,history])

    const deleteUserHandler=(id)=>{
        disptach(deleteUsers(id))
    }

    const setUsers = () => {
        const data = {
            columns: [
                {
                    label: "UserID",
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: "Name",
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: "Email",
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: "Role",
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: "Actions",
                    field: 'actions'
                }
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name:user.name,
                email:user.email,
                role:user.role,


                




                actions: <Fragment>
                    <Link to={`/admin/user/${user._id}`} className='btn btn-primary py-1 px-2'>
                        <i className='fa fa-pencil'></i>

                    </Link>

                    <button className='btn btn-danger py-1 px-2 ml-2' onClick={()=>deleteUserHandler(user._id)} >
                        <i className='fa fa-trash' ></i>
                    </button>
                </Fragment>
            })
        })


        return data;
    }
    return (
        <Fragment>
        <Metadata title={"All Users"} />
        <div className='row'>
            <div className="col-12 col-md-2">
                <Sidebar />

            </div>
            <div className='col-12 col-md-10'>
                <Fragment>
                    <h1 className='my-5'>
                        All Users
                    </h1>

                    {loading ? <Loader /> : (
                        <Fragment>

                            <MDBDataTable
                                data={setUsers()}
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

export default UsersList
