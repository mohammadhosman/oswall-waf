import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../../styling/register/RegisterForm.css";
import React, { useState } from 'react';
import axios from 'axios';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState(''); // I'm thinking of getting rid of the second address field
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here is where I handle the form submission
    const formData = {
      email: email,
      password: password,
      name: name,
      address: address,
      city: city,
      country: country
    }
    // Send the form data to the backend API
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration successfully sent from RegisterForm component', response.data);
    } catch (error){
      console.error('Error sending registration data from RegisterForm component', error);
      // Handle the error appropriately, e.g., show a notification to the user
      alert('Registration failed. Please try again.');
    }
  }

    return (
        <Form id='register-form' className='mt-3' onSubmit={handleSubmit}>
      <Row className="mb-3">

        {/* This is for the user's email */}
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            className='w-75'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </Form.Group>

        {/* This is for the user's password */}
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            className='w-75'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
      </Row>

        {/* This is for the user's name */}
      <Form.Group className="mb-3" controlId="formGridName">
        <Form.Label>Name</Form.Label>
        <Form.Control 
          placeholder="Enter your first name here..." 
          className='w-50' 
          value={name}
          onChange={e => setName(e.target.value)}

        />
      </Form.Group>

        {/* This is for the user's address */}
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Address</Form.Label>
        <Form.Control 
          placeholder="1234 Main St" 
          className='w-50'
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
      </Form.Group>

        {/* This is for the user's city */}
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>City</Form.Label>
          <Form.Control 
            value={city}
            onChange={e => setCity(e.target.value)}
          />
        </Form.Group>

        {/* This is for the user's country */}
        <Form.Group as={Col} controlId="formGridCountry">
          <Form.Label>Country</Form.Label>
          <Form.Control 
            value={country}
            onChange={e => setCountry(e.target.value)}
          />
        </Form.Group>

        {/*}
        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Zip</Form.Label>
          <Form.Control />
        </Form.Group>
        */}
      </Row>

        {/* 
      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      */}

      <Button variant="primary" type="submit">
        Sign me up
      </Button>
    </Form>
    )
}

export default RegisterForm;