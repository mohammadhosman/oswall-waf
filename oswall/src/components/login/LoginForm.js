import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../styling/login/LoginForm.css";

function LoginForm() {
  return (
    <Form id='login-form' className='mt-3'>

        {/* This is where a user will enter their username. For now,
        users will use their email as their username */}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter your username/email</Form.Label>
        <Form.Control type="email" placeholder="Enter username here..."
        className='w-25' />
      </Form.Group>

        {/* This is where a user will enter their password */}
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" className='w-25'/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>

    </Form>
  );
}

export default LoginForm;