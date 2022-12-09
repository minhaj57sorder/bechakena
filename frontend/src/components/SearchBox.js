import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')

  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      navigate(`/search/${keyword}`)
    } else {
      navigate('/')
    }
  }

  return (
    <Form onSubmit={submitHandler} className='row align-items-center'>
      <div className='p-0 col-auto'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>

      </div>
      <div className='p-0 col-auto'> 
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>

      </div>
    </Form>
  )
}

export default SearchBox