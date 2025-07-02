import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import "../../styling/register/RegisterForm.css";
import React, { useState } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom'; 
import './RegisterForm.css';

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState('');
  const [address2, setAddress2] = useState(''); // I'm thinking of getting rid of the second address field
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const navigate = useNavigate();

  // Add a timer ref to clear timeout on unmount or new error
  const timerRef = React.useRef();

  const validateEmail = (value) => {
    // Simple email regex
    const re = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i;
    return re.test(String(value).toLowerCase());
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value === "") {
      setEmailError("");
      return;
    }
    if (emailTouched) {
      if (!validateEmail(e.target.value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError("");
      }
    } else {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    // If confirmPassword is empty, clear error
    if (confirmPassword === "") {
      setPasswordError("");
      return;
    }
    if (e.target.value !== confirmPassword) {
      setPasswordError("Passwords do not match. Please try again.");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setPasswordError(""), 3000);
    } else {
      setPasswordError("");
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value === "") {
      setPasswordError("");
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    if (password !== e.target.value) {
      setPasswordError("Passwords do not match. Please try again.");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setPasswordError(""), 3000);
    } else {
      setPasswordError("");
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword === "") {
      setPasswordError("");
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match. Please try again.");
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setPasswordError(""), 3000);
      return;
    } else {
      setPasswordError("");
      if (timerRef.current) clearTimeout(timerRef.current);
    }
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
      if (response.status === 201) {
        setSuccess('Registration successful. Redirecting...');
            // localStorage.setItem('token', res.data.token);
            setTimeout(() => {
                navigate('/login'); 
            }, 1500); // 1.5 second delay for user to see the message
      }
      console.log('Registration successfully sent from RegisterForm component', response.data);
    } catch (error){
      setError('Registration failed.');
      console.error('Error sending registration data from RegisterForm component', error);
      // Show registration error to the user
      alert('Registration failed. Please try again.');
    }
  }

    return (
      <>
      {success && <Alert variant="success">{success}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
        <Form id='register-form' className='mt-3' onSubmit={handleSubmit}>
      <Row className="mb-3">

        {/* This is for the user's email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        isInvalid={!!emailError && emailTouched}
      />
      {emailError && emailTouched && <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>}
    </Form.Group>

        {/* This is for the user's password */}
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridConfirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Re-enter your password"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
      </Form.Group>
      {passwordError && (
        <div className={`register-error-message${passwordError ? ' show' : ''}`}>{passwordError}</div>
      )}
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
    </>
    );
}

export default RegisterForm;