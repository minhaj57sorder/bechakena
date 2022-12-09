import React, {useEffect} from 'react'
import {Link, useLocation, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from "../components/Message"
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = () => {
    const {search} = useLocation()
    const {id} = useParams()
    // console.log(search, id)
    const qty = search ? Number(search.split('=')[1]):1
    const {cartItems} = useSelector(state=>state.cart)
    // console.log(cartItems)

    const dispatch = useDispatch()
    useEffect(()=>{
        if(id) dispatch(addToCart(id,qty))
    },[dispatch, id, qty])

    const removeFromCartHandler=(productId)=>{
        dispatch(removeFromCart(productId))
        // console.log("cart removed",productId)
    }
    const navigate = useNavigate()
    const checkoutHandler = ()=> navigate(`/login?redirect=/shipping`)
    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1>
                {cartItems.length ===0? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message>:(
                    <ListGroup>
                        {cartItems.map(item=>( 
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid/>
                                    </Col>
                                    <Col md={2}>
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </Col>
                                    <Col md={2}>${item.price}</Col>
                                    <Col md={3}>
                                        <Form.Control
                                            as='select'
                                            value={item.qty}
                                            onChange={(e) => dispatch(addToCart(item.product,e.target.value))}>
                                                {[...Array(item.countInStock).keys()].map(
                                                    (x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    )
                                                )}
                                        </Form.Control>
                                    </Col>
                                    <Col md={2}>
                                        <Button variant="light" onClick={()=>removeFromCartHandler(item.product)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup>
                        <ListGroup.Item>
                            <h2>Subtotal ({cartItems.reduce((acc, item) => acc + 1*item.qty, 0)}) Items</h2>
                            ${cartItems.reduce((acc, item)=> acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <ListGroup.Item className="d-grid gap-2">
                            <Button type='button' className='btn btn-block' onClick={()=>checkoutHandler()}>Proceed to Checkout</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen