import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <>
            <Card className='my-3 p-3 rounded'>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                    <Link to={`./product/${product._id}`}>
                        <Card.Title as="div"><strong>{product.name}</strong></Card.Title>
                    </Link>
                    <Card.Text as="div">
                        <Rating value={product.rating} text={`from ${product.numReviews} review`} />
                    </Card.Text>
                    <Link to={`./product/${product._id}`}>
                        <Card.Text as="h3">
                            ${product.price}
                        </Card.Text>
                    </Link>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product