import React from 'react'
import {  useHistory } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Metadata from '../layout/Metadata';
import { newProduct, clearError } from '../../actions/productActions';
import { useAlert } from 'react-alert'

import Sidebar from './Sidebar'
import { NEW_PRODUCT_RESET } from '../../constans/productsConstans';

const NewProduct = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0)
    const [seller, setSeller] = useState('')
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([])

    const categories = [


        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        "Books",
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home'
    ]
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()
    const { loading, error, success } = useSelector(state => state.newProduct)
    useEffect(() => {


        if (error) {
            alert.error(error)
            dispatch(clearError())
        }

        if (success) {
            history.push('/admin/products')
            alert.success('Uspesno ste dodali product')
            dispatch({ type: NEW_PRODUCT_RESET })
           
        }
    }, [alert, dispatch, error, history, success])


    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('price', price);
        formData.set('description', description);
        formData.set('category', category);
        formData.set('stock', stock);
        formData.set('seller', seller);

        images.forEach(image => {
            formData.append('images', image)
        })

        dispatch(newProduct(formData))
    }

    const onChange = (e) => {

        const files = Array.from(e.target.files)

        setImagesPreview([])
        setImages([])

        files.forEach(file => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview(oldArray => [...oldArray, reader.result])
                    setImages(oldArray => [...oldArray, reader.result])
                } else {
                    console.log('GRESKA')
                }
            }

            reader.readAsDataURL(file)
        })



    }

    return (
        <Fragment>
            <Metadata title={"New Product"} />
           
            <div className='row'>
                <div className="col-12 col-md-2">
                    <Sidebar />

                </div>
                <div className='col-12 col-md-10'>
                    <Fragment>
                            <div className="wrapper my-5">
                                <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                                    <h1 className="mb-4">New Product</h1>

                                    <div className="form-group">
                                        <label htmlFor="name_field">Name</label>
                                        <input
                                            type="text"
                                            id="name_field"
                                            className="form-control"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price_field">Price</label>
                                        <input
                                            type="text"
                                            id="price_field"
                                            className="form-control"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description_field">Description</label>
                                        <textarea className="form-control" id="description_field" rows="8" value={description} onChange={(e) => setDescription(e.target.value)} ></textarea>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="category_field">Category</label>
                                        <select className="form-control" id="category_field" value={category} onChange={(e) => setCategory(e.target.value)}>
                                            {categories.map(categoryy => (

                                                <option key={categoryy} value={categoryy}>{categoryy}</option>
                                            ))}


                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="stock_field">Stock</label>
                                        <input
                                            type="number"
                                            id="stock_field"
                                            className="form-control"
                                            value={stock}
                                            onChange={(e)=>setStock(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="seller_field">Seller Name</label>
                                        <input
                                            type="text"
                                            id="seller_field"
                                            className="form-control"
                                            value={seller}
                                            onChange={(e)=>setSeller(e.target.value)}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Images</label>

                                        <div className='custom-file'>
                                            <input
                                                type='file'
                                                name='product_images'
                                                className='custom-file-input'
                                                id='customFile'
                                                onChange={onChange}
                                                multiple
                                            />
                                            <label className='custom-file-label' htmlFor='customFile'>
                                                Choose Images
                        </label>
                                        </div>

                                        {imagesPreview.map(img=>(

                                            <img src={img} key={img} alt="Image Preview" className='mt-3 mr-2' width="55" height="52"> 
                                            </img>
                                        ))}
                                    </div>


                                    <button
                                        id="login_button"
                                        type="submit"
                                        className="btn btn-block py-3"
                                        disabled={loading ? true : false}
                                    >
                                        CREATE
            </button>

                                </form>
                            </div>
                       


                    </Fragment>

                </div>

            </div>
            

        </Fragment>
    )
}

export default NewProduct
