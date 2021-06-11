import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import Metadata from '../components/layout/Metadata'
import Pagination from 'react-js-pagination'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import { useDispatch, useSelector } from 'react-redux'

import { useAlert } from 'react-alert';
import { getProducts } from '../actions/productActions'
import Product from './product/product'
import Loader from './layout/Loader'


const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range)

function Home({ match }) {


  const alert = useAlert();

  const dispatch = useDispatch();

  const { loading, products, error, productCounts, resPerPage,filteredProductsCount } = useSelector(state => state.products)
  //STATE FOR PAGINATION, FILTER
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([1, 1000])
  const [category, setCategory] = useState('')
  const [rating,setRating]= useState(0)



  const keyword = match.params.keyword

  //UseEffect
  useEffect(() => {


    if (error) {
      return alert.error("Desila se greska")
    } else {
      dispatch(getProducts(keyword, currentPage, price, category,rating));
      setTimeout(() => {
        return alert.success('Uspesno!')
      }, 1000)

    }


  }, [dispatch, keyword, alert, error, currentPage, price, category, rating])

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

  //SetCurrentPageNo
  function setCurrentPageNo(pageNumber) {

    setCurrentPage(pageNumber)
  }

  let count = productCounts;

  if(keyword){
    count = filteredProductsCount
  }

  return (
    <Fragment>

      {loading ? <Loader /> : (

        <Fragment>

          <Metadata title={'Kupuj najbolje proizvode online'} />
          <div className='container container-fluid'>
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" class="container mt-5">
              <div class="row">

                {keyword ? (
                  <Fragment>
                    <div className='col-6 col-md-3 mt-5 mb-5'>
                      <div className='px-5'>
                        <Range
                          marks={{
                            1: "$1",
                            1000: "$1000"
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={value => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: true
                          }}
                          value={price}
                          onChange={price => setPrice(price)}



                        />
                      </div>
                          <hr className='my-5' />
                      <div className='mt-5'>
                        <h4 className='mb-3'>
                          Kategorije
                        </h4>
                          <ul className="pl-0">
                            {categories.map(category=>(
                              <li   style={{cursor:'pointer',
                                            listStyleType:"none" }}
                                    key={category}

                                    onClick={()=>setCategory(category)}
                              
                              
                              >
                                {category}
                              </li>
                            ))}

                          </ul>

                      </div>
                      <hr className='my-5' />
                      <div className='mt-5'>
                        <h4 className='mb-3'>
                          Ratings
                        </h4>
                          <ul className="pl-0">
                            {[5,4,3,2,1].map(star=>(
                              <li   style={{cursor:'pointer',
                                            listStyleType:"none" }}
                                    key={star}
                                    onClick={()=>setRating(star)}
                              
                              
                              >
                               <div className='rating-outer'>
                                 <div className='rating-inner'
                                 
                                      style={{width:`${star * 20}%`}}
                                 >
                                 
                                 </div>

                               </div>
                              </li>
                            ))}

                          </ul>

                      </div>



                    </div>

                    <div className='col-6 col-md-9'>
                      <div className='row'>
                        {products && products.map(product => (

                          <Product key={product._id} product={product} col={4} />

                        ))}

                      </div>

                    </div>

                  </Fragment>
                ) : (

                  products && products.map(product => (

                    <Product key={product._id} product={product} col={3} />

                  ))

                )}





              </div>
            </section>
            {resPerPage <= count && (
              <div className="d-flex justify-content-center mt-5">

                <Pagination

                  activePage={currentPage}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={productCounts}
                  onChange={setCurrentPageNo}
                  nextPageText={"Next"}
                  prevPageText={"Pre"}
                  firstPageText={"First"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"

                />

              </div>
            )}

          </div>
        </Fragment>
      )}



    </Fragment>
  )
}

export default Home
