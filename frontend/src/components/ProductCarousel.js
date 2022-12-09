import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Carousel, Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopProduct } from '../actions/productActions'
import { useDispatch, useSelector } from 'react-redux'

const ProductCarousel = () => {
    const dispatch = useDispatch()
    const productTopRated = useSelector(state=>state.productTopRated)
    const {loadingTopProducts, errorTopProducts, topProducts } = productTopRated
    console.log(topProducts)
    useEffect(()=>{
        dispatch(listTopProduct())
    },[dispatch])
  return loadingTopProducts ? <Loader /> : errorTopProducts ? <Message variant='danger'>{errorTopProducts}</Message>:(
    <Carousel pause='hover' className='bg-dark'>
      {(topProducts!==undefined) && (topProducts.length !== 0) && topProducts.map(product => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} (${product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  )
}

export default ProductCarousel