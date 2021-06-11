import React from 'react'
import { Fragment } from 'react'
import { Component } from 'react'
import { Redirect, Route, } from 'react-router-dom'
import { useSelector} from 'react-redux'

const ProtectedRoute = ({ isAdmin,component: Component, ...rest }) => {

    const { isAuthUser, loading, user } = useSelector(state => state.auth)
    return (
        <Fragment>
            {loading === false && (
                <Route

                    {...rest}
                    render={props => {
                        if (isAuthUser === false) {
                            return <Redirect to='/login' />
                        }

                        if(isAdmin === true && user.role!== 'admin'){
                            return <Redirect to="/" />
                        }
                        return <Component { ...props } />
                    }
                    }
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute
