import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'

import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails, createProductReview } from '../actions/productActions'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductScreen = () => {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const { loading, product, error } = useSelector(state => state.productDetails)
    const { userInfo } = useSelector(state => state.userLogin)

    const { success: successProductReview, error: errorProductReview } = useSelector(state => state.productReviewCreate)
    console.log(product, loading, error)
    const { id } = useParams()
    useEffect(() => {
        if(successProductReview){
            alert('Review Submitted!')
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(id))
    }, [id, successProductReview, dispatch])
    const navigate = useNavigate()
    const addToCartHandler = () => {
        navigate(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(createProductReview(id, {rating,comment}))
    }

    return (
        <>
        <Meta title={product.name} />
            <Link className='btn btn-dark my-3' to="/">Go back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (<>
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
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews !== undefined && product.reviews.length === 0 && <Message>No reviews.</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews !== undefined && product.reviews.map(review=>(
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0,10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                    <ListGroup.Item>
                                        <h2>Write a Customer Review</h2>
                                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}
                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control as='select' value={rating} onChange={(e)=> setRating(e.target.value)}>
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                                <Form.Group>
                                                    <Form.Label>Comment</Form.Label>
                                                    <Form.Control as='textarea' row='3' value={comment} onChange={(e)=> setComment(e.target.value)}></Form.Control>
                                                </Form.Group>
                                                <Button type='submit' variant='primary'>Submit</Button>
                                            </Form>
                                        ):(
                                            <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                                        )}
                                    </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>

                </>)}
        </>
    )
}

export default ProductScreen