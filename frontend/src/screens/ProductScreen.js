import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'

import Rating from '../components/Rating'

const ProductScreen = () => {
    const [product, setProduct] = useState([])
    const { id } = useParams()
    // product = products.find(p => p._id === id)
    useEffect(() => {
        const fetchProduct = async () => {
            const response = await axios.get(`http://localhost:5000/api/products/${id}`, { mode: 'cors' })
            setProduct(response.data)
        }
        fetchProduct()
    }, [id])
    return (
        <>
            <Link className='btn btn-dark my-3' to="/">Go back</Link>
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid></Image>
                </Col>
                <Col md={3}>
                    <ListGroup>
                        <ListGroup.Item variant='flush'>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item variant='flush'>
                            <Rating value={product.rating} text={`from ${product.numReviews} review`} />
                        </ListGroup.Item>
                        <ListGroup.Item variant='flush'>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item variant='flush'>
                            <span className='h5'>Description:</span> {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Statuw:</Col>
                                    <Col>{product.countInStock !== 0 ? 'In Stoke' : 'Out Of Stoke'}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="d-grid gap-2">
                                <Button className='btn btn-block' type='button' disabled={product.countInStock === 0}>Add To Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen