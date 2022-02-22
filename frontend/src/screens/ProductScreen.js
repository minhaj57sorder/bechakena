import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const dispatch = useDispatch()
    const { loading, product, error } = useSelector(state => state.productDetails)
    // console.log(product, loading, error)
    const { id } = useParams()
    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [id])
    const navigate = useNavigate()
    const addToCartHandler = () => {
        navigate(`/cart/${product._id}?qty=${qty}`)
    }
    return (
        <>
            <Link className='btn btn-dark my-3' to="/">Go back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (
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
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {[...Array(product.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item className="d-grid gap-2">
                                        <Button className='btn btn-block' type='button' onClick={addToCartHandler} disabled={product.countInStock === 0}>Add To Cart</Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                )}
        </>
    )
}

export default ProductScreen