import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'
import { listProducts } from '../actions/productActions.js'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { useParams } from 'react-router-dom'
import Paginate from '../components/Paginate.js'
import ProductCarousel from '../components/ProductCarousel.js'
import Meta from '../components/Meta.js'
import { Link } from 'react-router-dom'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const {keyword, pageNumber} = useParams()

    const { loading, products,page, pages, error } = useSelector(state => state.productList)
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])
    return (
        <>
        <Meta />

            {!keyword && <ProductCarousel />}
            {keyword && <Link className='btn btn-dark my-3' to="/">Go back</Link>}
            <h1>Latest products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                <Row>
                    {products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
                <Paginate page={page} pages={pages} keyword={keyword? keyword:''}></Paginate>
                </>
            )}
        </>
    )
}

export default HomeScreen