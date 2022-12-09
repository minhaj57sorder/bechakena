import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Form, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const cart = useSelector(state=>state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress){
        navigate('/shipping')
    }
    const [paymentMethod, setPaymentMethod]= useState('PayPal')

    const submitHandler = ()=>{
        console.log(paymentMethod)
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
  return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group>
            <Form.Label as='legend'>Select Method</Form.Label>
            <Col>
                <Form.Check
                type='radio'
                label='PayPal or Credit Card'
                value='PayPal'
                id='PayPal'
                name='paymentMethod'
                checked
                onChange={(e)=>setPaymentMethod(e.target.value)}
                ></Form.Check>
                <Form.Check
                type='radio'
                label='Strip'
                value='Strip'
                id='Strip'
                name='paymentMethod'
                onChange={(e)=>setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>
                Continue
            </Button>
        </Form>
    </FormContainer>
  )
}

export default PaymentScreen