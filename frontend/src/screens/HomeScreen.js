import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product.js'

const HomeScreen = () => {
    const [products, setProducts] = useState([])
    useEffect(() => {
        const fetchProducts = async () => {
            const response = await axios.get('/api/products', { mode: 'cors' }).catch(error => console.log(error))
            // console.log(response.data)
            setProducts(response.data)
        }
        fetchProducts()
    }, [])
    return (
        <>
            <h1>Latest products</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen