import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'
import { listProducts } from '../actions/productActions.js'
import Message from '../components/Message'
import Loader from '../components/Loader'

const HomeScreen = () => {
    const dispatch = useDispatch()
    const { loading, products, error } = useSelector(state => state.productList)
    useEffect(() => {
        dispatch(listProducts())
    }, [])
    return (
        <>
            <h1>Latest products</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    {products.map(product => (
                        <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen