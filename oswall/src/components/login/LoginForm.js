import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../styling/login/LoginForm.css";
import React, {useState} from 'react';
import axios from 'axios';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // creating an object with the form data
    const formData = {
      email: email,
      password: password
    }
    try {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    // Send the form data to the backend API using axios
    const response = await axios.post(`${backendUrl}/api/auth/login`, formData);
    // Let user know that the login was successful
    console.log('Login successfully sent from LoginForm component', response.data);
    localStorage.setItem('token', response.data.token);
    console.log('Token in localStorage:', localStorage.getItem('token'));
    window.location.reload(); // Reload the page to reflect the login state
    alert('Login successful!');
    } catch (error) {
      console.error('Error sending login data from LoginForm component', error);
      // Handling error
      alert('Login failed. Please check your credentials and try again.');
    }
  }

  return (
    <Form id='login-form' className='mt-3' onSubmit={handleSubmit}>

        {/* This is where a user will enter their username. For now,
        users will use their email as their username */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Login with your email</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email here..."
          className='w-25' 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Group>

        {/* This is where a user will enter their password */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          placeholder="Password" 
          className='w-25'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>

    </Form>
  );
}

export default LoginForm;