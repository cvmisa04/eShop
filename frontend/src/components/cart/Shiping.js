import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { countries } from 'countries-list'
import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../layout/Metadata';
import { saveShipingInfo } from '../../actions/cartActions';
import CheckoutSteps from './CheckoutSteps'


const Shiping = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { shipingInfo } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shipingInfo.address)
    const [city, setCity] = useState(shipingInfo.city)
    const [postalCode, setPostalCode] = useState(shipingInfo.postalCode)
    const [PhoneNo, setPhoneNo] = useState(shipingInfo.PhoneNo)
    const [country, setCountry] = useState(shipingInfo.country)

    const countryList = Object.values(countries)

    const sumbitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShipingInfo({address, city, postalCode, PhoneNo, country}))
        history.push('/order/confirm')
    }
    return (
        <Fragment>
            <Metadata title={'Shiping Info'} />
            <CheckoutSteps shiping/>
            <div class="row wrapper">
                <div class="col-10 col-lg-5">
                    <form class="shadow-lg" onSubmit={sumbitHandler}>
                        <h1 class="mb-4">Shipping Info</h1>
                        <div class="form-group">
                            <label htmlFor="address_field">Address</label>
                            <input
                                type="text"
                                id="address_field"
                                class="form-control"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label htmlFor="city_field">City</label>
                            <input
                                type="text"
                                id="city_field"
                                class="form-control"
                                value={city}
                                required
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label htmlFor="phone_field">Phone No</label>
                            <input
                                type="phone"
                                id="phone_field"
                                class="form-control"
                                value={PhoneNo}
                                required
                                onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label htmlFor="postal_code_field">Postal Code</label>
                            <input
                                type="number"
                                id="postal_code_field"
                                class="form-control"
                                value={postalCode}
                                required
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>

                        <div class="form-group">
                            <label htmlFor="country_field">Country</label>
                            <select
                                    id="country_field"
                                    class="form-control"
                                   
                                    value={country}
                                    required
                                    onChange={(e)=>setCountry(e.target.value)}
                                >
                            {countryList.map(country => (

                                
                                    <option  key={country.name} value={country.name}>
                                        {country.name}
                                    </option>

                               
                            ))}
                            </select>

                        </div>

                        <button
                            id="shipping_btn"
                            type="submit"
                            class="btn btn-block py-3"
                        >
                            CONTINUE
                            </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shiping
